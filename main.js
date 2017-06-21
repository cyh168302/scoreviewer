// JavaScript Document
function link1()
{window.open("http://www59.atwiki.jp/lovelive-sif/pages/115.html");}
function link2()
{window.open("http://weibo.com/jebwizoscar");}
function link3()
{window.open("http://shiitake.me/llbeatmap");}
function link4()
{window.open("http://wpa.qq.com/msgrd?v=3&uin=2982349992&site=qq&menu=yes");}

function drawVline(l)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	for(i=0;i<10;i++)
	{
		cxt.fillStyle="#000000";
		cxt.fillRect(i*70,0,2,l); 
	}
}

function drawText(text,x,y)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	cxt.font = "bold 12px Arial";	
	cxt.fillStyle = "black";
	cxt.fontweight = "bold";
	cxt.fillText(text, x, y);
}

function drawgrid(type,y)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	if(type == 0)cxt.fillStyle="#BBBBBB";
	else cxt.fillStyle="#000000";
	cxt.fillRect(1,y,630,1); 
	
}

function drawnote(type,value,x,y)
{
	var c = document.getElementById("myCanvas");
	var cxt = c.getContext("2d");
	switch(type)
	{
		case 0:
		{
			cxt.fillStyle="#00D030";
			cxt.fillRect(634-x*70,y-2,64,5); 
			break;
		}
		case 1:
		{	
			cxt.fillStyle="#00D030";
			cxt.fillRect(634-x*70,y-value-2,64,value+5); 
			break;
		}
		case 2:
		{
			cxt.fillStyle="#FF8080";
			cxt.fillRect(658-x*70,y-8,16,16); 
			break;
		}
		case 3:
		{	
			cxt.fillStyle="#FF8080";
			cxt.fillRect(658-x*70,y-value-2,16,value+5); 
			break;
		}
		default:break;
	}
}

function readbeatmap(path,id)
{
	$.getJSON("http://r.llsif.win/maps.json",function(data){
		var i;
		var songname;
		for(i=0;i<data.length;i++)
			if(data[i]["live_track_id"]==id)songname = data[i]["name"];
		$.getJSON("bpm.json",function(data){
			var bpm = data[songname];
			$.getJSON(path,function(data){
				startDraw(data,bpm);
				});
			});
		});
}

function startDraw(beatmap,bpm)
	{
		if(bpm.length>3)bpm = bpm.substr(bpm.length-3,3);
		bpm = parseInt(bpm);
		document.getElementById("songs").innerHTML = 
			"<p>歌曲BPM："+ bpm +"</p>"+
			"<canvas id=\"myCanvas\" width=\"750\" height=\"300\" style=\"background:#FFF\">您的浏览器不支持canvas</canvas>";
		var ival = parseInt(document.getElementById("grid_ival").value);
		var sp = parseInt(document.getElementById("space").value);
		var time_offset = parseFloat(beatmap[0]["timing_sec"]);
		var beatmap_length = parseFloat(beatmap[beatmap.length-1]["timing_sec"])- time_offset;
		var l = 0;
		var l1 = 0;
		var l2 = 0;
		if((beatmap[beatmap.length-2]["effect"]=="3")|(beatmap[beatmap.length-2]["effect"]=="13"))
			var l1 = parseFloat(beatmap[beatmap.length-2]["effect_value"]);
		if((beatmap[beatmap.length-1]["effect"]=="3")|(beatmap[beatmap.length-1]["effect"]=="13"))
			var l2 = parseFloat(beatmap[beatmap.length-1]["effect_value"]);
		if(l1>l2)l=l1;
		else l=l2;
		beatmap_length = beatmap_length + l
		var beatmap_length1 = Math.floor(beatmap_length*sp)+30;
		var c=document.getElementById("myCanvas");
		c.height = beatmap_length1+2;
		c.style.background = "#EEE";
			
		if(ival!=0)
		{
			var time_beat = 60000.0/bpm;
			var time_ival = time_beat/ival;	
			var i = 0;
			var k = beatmap_length1;
			while(k>0)
			{
				k = Math.floor((beatmap_length - i*time_ival/1000)*sp)+20;
				i = i + 1;
				if(i%(ival*4)==1)
				{
					var m = Math.floor(i/(ival*4));
					var t = m*time_beat/250+time_offset;
					t = Math.floor(t*1000)
					var tx1 = "Measure:" + m;
					var tx2 = "Time："+ t +"ms"
					drawText(tx1,640,k-9);
					drawText(tx2,640,k+11);
				}
				if(i%ival==1)drawgrid(1,k);	
				else drawgrid(0,k);
			}
		}
			
		drawVline(beatmap_length1);
		for(i=0;i<beatmap.length;i++)
		{
			var note_type = beatmap[i]["effect"];
			if ((note_type=="1")|(note_type=="2")|(note_type=="4"))
			{
				var pos = parseInt(beatmap[i]["position"]);
				var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
				drawnote(0,0,pos,time);
			}
			if (note_type=="3")
			{
				var pos = parseInt(beatmap[i]["position"]);
				var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
				var value = parseFloat(beatmap[i]["effect_value"])*sp;
				drawnote(1,value,pos,time);
			}
			if (note_type=="11")
			{
				var pos = parseInt(beatmap[i]["position"]);
				var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
				drawnote(2,0,pos,time);
			}
			if (note_type=="13")
			{
				var pos = parseInt(beatmap[i]["position"]);
				var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
				var value = parseFloat(beatmap[i]["effect_value"])*sp;
				drawnote(3,value,pos,time);
			}
		}
			
		var j;
		var notes_level = 0;
		var cnt = 0;
		var cxt=c.getContext("2d");
		cxt.lineWidth = 5; 
		cxt.strokeStyle = 'rgba(255,128,128,0.8)'; 
		for(i=0;i<beatmap.length;i++)
		{
			var temp = parseInt(beatmap[i]["notes_level"]);
			if(notes_level<temp)notes_level=temp;
		}
		for(j=2;j<=notes_level;j++)
		{
			cnt = 0;
			for(i=0;i<beatmap.length;i++)
			{
				if(parseInt(beatmap[i]["notes_level"])==j)
				{
					var pos = parseInt(beatmap[i]["position"]);
					var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
					if(cnt>0)
					{
						cxt.lineTo((9-pos)*70+35,time);
						cxt.stroke();	
					}
					cxt.moveTo((9-pos)*70+35,time);
					cnt = cnt + 1;
				}
			}
		}
	}