// JavaScript Document
function backtop()
{
	var temp = document.createElement("a");
	temp.href = "#header";
	temp.click();	
}
function tobuttom()
{
	var temp = document.createElement("a");
	temp.href = "#buttom";
	temp.click();	
}
function link1()
{window.open("http://www59.atwiki.jp/lovelive-sif/pages/115.html");}
function link2()
{window.open("http://weibo.com/jebwizoscar");}
function link3()
{window.open("http://shiitake.me/llbeatmap");}
function link4()
{window.open("http://wpa.qq.com/msgrd?v=3&uin=2982349992&site=qq&menu=yes");}
function link5()
{window.open("http://github.com/cyh168302/scoreviewer");}
function confirm_fliter(){$.getJSON("http://r.llsif.win/maps.json",function(data){get_beatmaps(data);});}
function confirm_search(){$.getJSON("http://r.llsif.win/maps.json",function(data){search_beatmaps(data);});}

function drawVline(l)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	for(i=0;i<10;i++)
	{
		cxt.fillStyle="#FFFFFF";
		cxt.fillRect(i*40,0,2,l); 
	}
}

function drawText(text,x,y)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	cxt.font = "bold 12px Arial";	
	cxt.fillStyle = "#FFFFFF";
	cxt.fontweight = "bold";
	cxt.fillText(text, x, y);
}

function drawgrid(type,y)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	if(type == 0)cxt.fillStyle="#666666";
	else cxt.fillStyle="#FFFFFF";
	cxt.fillRect(1,y,360,1); 
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
			cxt.fillRect(363-x*40,y-2,36,5); 
			break;
		}
		case 1:
		{	
			cxt.fillStyle="#00D030";
			cxt.fillRect(363-x*40,y-value-2,36,value+5); 
			break;
		}
		case 2:
		{
			cxt.fillStyle="#FF8080";
			cxt.fillRect(375-x*40,y-5,11,11); 
			break;
		}
		case 3:
		{	
			cxt.fillStyle="#FF8080";
			cxt.fillRect(375-x*40,y-value-2,11,value+5); 
			break;
		}
		case 4:
		{
			cxt.fillStyle="#EE0000";
			cxt.fillRect(375-x*40,y-5,11,11); 
			break;
		}
		case 5:
		{
			cxt.fillStyle="#EEEE00";
			cxt.fillRect(375-x*40,y-5,11,11); 
			break;
		}
		default:break;
	}
}

function readbeatmap(path,id,musicpath,combo)
{
	document.getElementById("songs").innerHTML = "<h2 style=\"position:relative;left:10px\">Now Loading...</h2>"
	$.getJSON("http://r.llsif.win/maps.json",function(data){
		var i;
		var songname;
		for(i=0;i<data.length;i++)
			if(data[i]["live_track_id"]==id)songname = data[i]["name"];
		$.getJSON("bpm.json",function(data){
			bpm = data[songname];
			$.getJSON(path,function(data){
				startDraw(data,bpm,musicpath,combo);
				});
			});
		});
}

function startDraw(beatmap,bpm,path,combo)
{
	if (typeof bpm == "undefined")bpm = "0";
	else if(bpm.length>3)bpm = bpm.substr(bpm.length-3,3);
	bpm = parseInt(bpm);
	if(bpm!=0)
		document.getElementById("songs").innerHTML = 
		"<canvas id=\"myCanvas\" width=\"480\" height=\"300\" style=\"background:#FFF;position:relative;left:10px\">您的浏览器不支持canvas</canvas>"+
		"<p>歌曲BPM："+ bpm + "&nbsp;&nbsp;&nbsp;总计键数："+ combo +"</p><p id=\"buttom\"><audio controls src ="+path+">不支持audio控件</audio></p>";
	else
		document.getElementById("songs").innerHTML = 
		"<canvas id=\"myCanvas\" width=\"480\" height=\"300\" style=\"background:#FFF;position:relative;left:10px\">您的浏览器不支持canvas</canvas>"+
		"<p>（缺少歌曲BPM）&nbsp;&nbsp;&nbsp;总计键数："+ combo +"</p><p id=\"buttom\"><audio controls src ="+path+">不支持audio控件</audio></p>";
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
			
	if((ival!=0)&(bpm!=0))
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
				drawText(tx1,370,k-9);
				drawText(tx2,370,k+11);
			}
			if(i%ival==1)drawgrid(1,k);	
			else drawgrid(0,k);
		}
	}
			
	drawVline(beatmap_length1);
	for(i=0;i<beatmap.length;i++)
	{
		var note_type = beatmap[i]["effect"];
		if (note_type=="1")
		{
			var pos = parseInt(beatmap[i]["position"]);
			var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
			drawnote(0,0,pos,time);
		}
		if (note_type=="2")
		{
			var pos = parseInt(beatmap[i]["position"]);
			var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
			drawnote(0,0,pos,time);
			drawnote(4,0,pos,time);
		}
		if (note_type=="4")
		{
			var pos = parseInt(beatmap[i]["position"]);
			var time =  Math.floor((beatmap_length - parseFloat(beatmap[i]["timing_sec"]) + time_offset)*sp)+20;
			drawnote(0,0,pos,time);
			drawnote(5,0,pos,time);
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
	cxt.lineWidth = 3; 
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
					cxt.lineTo((9-pos)*40+20,time);
					cxt.stroke();	
				}
				cxt.moveTo((9-pos)*40+20,time);
				cnt = cnt + 1;
			}
		}
	}
	tobuttom();
}
		
function get_beatmaps(data)
{
	var innerhtml = "";
	var songslist = document.getElementById("songs");
	var len = data.length;
	var song_attr = document.getElementById("song_attr").value;
	var song_level = document.getElementById("song_level").value;
	var song_type = document.getElementById("song_type").value;
	var j;
	var p;
	var flag = true;
			
	if(song_level!="0")
	{
		for(p=1;p<7;p++)
		{
			for(i=0;i<len;i++)
			{
				if((data[i]["stage_level"]==song_level)&(data[i]["difficulty"]==p))
				{
					if ((data[i]["difficulty_text"]!="TECHNICAL")&((data[i]["difficulty_text"]==song_type)|(song_type=="0")))
					{
						if ((data[i]["attribute_icon_id"]==song_attr)|(song_attr=="0"))
						{
							var beatmap_path = "http://a.llsif.win/live/json/"+data[i]["notes_setting_asset"];
							var sound_asset = "http://r.llsif.win/"+data[i]["sound_asset"];
							switch(data[i]["attribute_icon_id"])
							{
								case 1:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
									beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
									sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:red;cursor:pointer\">";break;}
								case 2:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
									beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
									sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:green;cursor:pointer\">";break;}
								case 3:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
									beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
									sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:blue;cursor:pointer\">";break;}
								default:break;
							}
							if(data[i]["live_setting_id"]>20000)innerhtml = innerhtml + "ARCADE - " + data[i]["name"]+"</p>";
							else 
							{
								var s_score = data[i]["s_rank_score"];
								var s_combo = data[i]["s_rank_combo"];
								var s = s_score/s_combo;
								var id = data[i]["live_setting_id"];
								if((s!=739)&(data[i]["difficulty_text"]=="MASTER"))
									innerhtml = innerhtml + data[i]["difficulty_text"] + "(滑) - " + data[i]["name"]+"</p>";
								else if((id==719)|(id==721)|(id==731))
									innerhtml = innerhtml + data[i]["difficulty_text"] + "(滑) - " + data[i]["name"]+"</p>";
								else 
									innerhtml = innerhtml + data[i]["difficulty_text"] + " - " + data[i]["name"]+"</p>";
							}
						}
					}
				}	
			}
		}
	}
	else
	{
		for(j=1;j<13;j++)
		{
			flag = true;
			for(p=1;p<7;p++)
			{
				for(i=0;i<len;i++)
				{
					if((data[i]["stage_level"]==j)&(data[i]["difficulty"]==p))
					{
						if ((data[i]["difficulty_text"]!="TECHNICAL")&((data[i]["difficulty_text"]==song_type)|(song_type=="0")))
						{
							if ((data[i]["attribute_icon_id"]==song_attr)|(song_attr=="0"))
							{
								if(flag)
								{	
									innerhtml = innerhtml + "<p>—————————★"+j+"—————————</p>";
									flag = false;
								}
								var beatmap_path = "http://a.llsif.win/live/json/"+data[i]["notes_setting_asset"];
								var sound_asset = "http://r.llsif.win/"+data[i]["sound_asset"];
								switch(data[i]["attribute_icon_id"])
								{
									case 1:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
										beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
										sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:red;cursor:pointer\">";break;}
									case 2:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
										beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
										sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:green;cursor:pointer\">";break;}
									case 3:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
										beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
										sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:blue;cursor:pointer\">";break;}
									default:break;
								}
								if(data[i]["live_setting_id"]>20000)innerhtml = innerhtml + "ARCADE - " + data[i]["name"]+"</p>";
								else 
								{
									var s_score = data[i]["s_rank_score"];
									var s_combo = data[i]["s_rank_combo"];
									var s = s_score/s_combo;
									var id = data[i]["live_setting_id"];
									if((s!=739)&(data[i]["difficulty_text"]=="MASTER"))
										innerhtml = innerhtml + data[i]["difficulty_text"] + "(滑) - " + data[i]["name"]+"</p>";
									else if((id==719)|(id==721)|(id==731))
										innerhtml = innerhtml + data[i]["difficulty_text"] + "(滑) - " + data[i]["name"]+"</p>";
									else 
										innerhtml = innerhtml + data[i]["difficulty_text"] + " - " + data[i]["name"]+"</p>";
								}
							}
						}
					}	
				}
			}
		}
	}
	if(innerhtml=="")innerhtml="<p>（没有找到对应歌曲）</p>"
	innerhtml = innerhtml + "<p id=\"buttom\"></p>";
	songslist.innerHTML = innerhtml;
}
		
function search_beatmaps(data)
{
	var innerhtml = "";
	var songslist = document.getElementById("songs");
	var len = data.length;
	var songname = document.getElementById("song_name").value;
	var j;
	var flag = true;
			
	for(j=1;j<13;j++)
	{
		flag = true;
		for(i=0;i<len;i++)
		{
			if(data[i]["stage_level"]==j)
			{
				if((data[i]["name"].toLowerCase().indexOf(songname.toLowerCase())>=0)&(data[i]["difficulty_text"]!="TECHNICAL"))
				{
					if(flag)
					{	
						innerhtml = innerhtml + "<p>—————————★"+j+"—————————</p>";
						flag = false;
					}
					var beatmap_path = "http://a.llsif.win/live/json/"+data[i]["notes_setting_asset"];
					var sound_asset = "http://r.llsif.win/"+data[i]["sound_asset"];
					switch(data[i]["attribute_icon_id"])
					{
						case 1:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
							beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
							sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:red;cursor:pointer\">";break;}
						case 2:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
							beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
							sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:green;cursor:pointer\">";break;}
						case 3:{innerhtml = innerhtml + "<p onclick=readbeatmap('" + 
							beatmap_path + "','" + data[i]["live_track_id"] + "','" + 
							sound_asset + "','" + data[i]["s_rank_combo"] + "') style=\"color:blue;cursor:pointer\">";break;}
						default:break;
					}
					if(data[i]["live_setting_id"]>20000)innerhtml = innerhtml + "ARCADE - " + data[i]["name"]+"</p>";
					else innerhtml = innerhtml + data[i]["difficulty_text"] + " - " + data[i]["name"]+"</p>";
				}	
			}
		}
	}
	if(innerhtml=="")innerhtml="<p>（没有找到对应歌曲）</p>"
	innerhtml = innerhtml + "<p id=\"buttom\"></p>";
	songslist.innerHTML = innerhtml;
}