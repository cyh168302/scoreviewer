// JavaScript Document
$(window).scroll(function()
{
    var t = document.body.scrollTop;
    var obj = document.getElementById("song_info");
    if (t < 570)
    {
        obj.style.position = "absolute";
        obj.style.top = "570px";
    }
    else
    {
        obj.style.position = "fixed";
        obj.style.top = "0px";
    }
});
function back_top()
{
	var temp = document.createElement("a");
	temp.href = "#header";
	temp.click();	
}
function to_bottom()
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
function confirm_filter(){$.getJSON("http://r.llsif.win/maps.json",function(data){get_beatmaps(data);});}
function confirm_search(){$.getJSON("http://r.llsif.win/maps.json",function(data){search_beatmaps(data);});}
function confirm_filter2(){$.getJSON("http://r.llsif.win/maps.json",function(data){get_beatmaps(data);back_top();});}
function confirm_search2(){$.getJSON("http://r.llsif.win/maps.json",function(data){search_beatmaps(data);back_top();});}


function get_stars(num)
{
	switch(num)
	{
		case 1:
			return "<span style=\"color:#3F3\">★</span>";
		case 2:
			return "<span style=\"color:#3F3\">★★</span>";
		case 3:
			return "<span style=\"color:#3F3\">★★★</span>";
		case 4:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★</span>";
		case 5:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★</span>";
		case 6:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>";
		case 7:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>"+
					"<span style=\"color:orange\">★</span>";
		case 8:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>"+
					"<span style=\"color:orange\">★★</span>";
		case 9:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>"+
					"<span style=\"color:orange\">★★★</span>";
		case 10:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>"+
					"<span style=\"color:orange\">★★★</span>"+"<span style=\"color:red\">★</span>";
		case 11:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>"+
					"<span style=\"color:orange\">★★★</span>"+"<span style=\"color:red\">★★</span>";
		case 12:
			return "<span style=\"color:#3F3\">★★★</span>"+"<span style=\"color:#EE0\">★★★</span>"+
					"<span style=\"color:orange\">★★★</span>"+"<span style=\"color:red\">★★★</span>";
		default:break;	
	}	
}

function drawVline(l)
{
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	for(i=0;i<10;i++)
	{
		cxt.fillStyle="#000000";
		cxt.fillRect(i*40+50,0,2,l); 
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
	cxt.fillRect(51,y,360,1); 
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
			cxt.fillRect(413-x*40,y-2,36,5); 
			break;
		}
		case 1:
		{	
			cxt.fillStyle="#00D030";
			cxt.fillRect(413-x*40,y-value-2,36,value+5); 
			break;
		}
		case 2:
		{
			cxt.fillStyle="#FF8080";
			cxt.fillRect(425-x*40,y-5,11,11); 
			break;
		}
		case 3:
		{	
			cxt.fillStyle="#FF8080";
			cxt.fillRect(425-x*40,y-value-2,11,value+6); 
			break;
		}
		case 4:
		{
			cxt.fillStyle="#EE0000";
			cxt.fillRect(425-x*40,y-5,11,11); 
			break;
		}
		case 5:
		{
			cxt.fillStyle="#EEEE00";
			cxt.fillRect(425-x*40,y-5,11,11); 
			break;
		}
		default:break;
	}
}

function readbeatmap(way,path,id,difficulty,level,musicpath,iconpath,combo)
{
	document.getElementById("songs").innerHTML = "<h2 style=\"position:relative;left:10px\">Now Loading...</h2>"
	$.getJSON("http://r.llsif.win/maps.json",function(data){
		var i;var songname;
		for(i=0;i<data.length;i++) {if (data[i]["live_track_id"] == id) {songname = data[i]["name"];break;}}
		$.getJSON("bpm.json",function(data){
			bpm = data[songname];
			$.getJSON(path,function(data){
				startDraw(path,data,bpm,songname,difficulty,level,musicpath,iconpath,combo,way);});});
		});
}

function startDraw(path,beatmap,bpm,name,difficulty,level,musicpath,iconpath,combo,way)
{
	var combos = [0,50,100,200,400,600,800];
	var combo_bonus = [1.00,1.10,1.15,1.20,1.25,1.30,1.35];
	var len = beatmap.length;
	var beatmap2 = new Array(len);
	for(i=0;i<len;i++)
	{
		var timing_sec = beatmap[i]["timing_sec"];
		var note_type = beatmap[i]["effect"];
		var note_pos = beatmap[i]["position"];
		if((note_type == "3")|(note_type == "13"))
		{
			timing_sec = String(parseFloat(beatmap[i]["timing_sec"])+parseFloat(beatmap[i]["effect_value"]));
		}
		var temp_note = [timing_sec,note_type,note_pos];
		beatmap2[i] = temp_note;
	}
	for(i=0;i<len;i++)
	{
		for(j=0;j<len-i-1;j++)
		{
			if(parseFloat(beatmap2[j][0])>parseFloat(beatmap2[j+1][0]))
			{
				var tempnote=beatmap2[j];
				beatmap2[j]=beatmap2[j+1];
				beatmap2[j+1]=tempnote;	
			}
		}	
	}
	var pos_notes_with_combo=[0,0,0,0,0,0,0,0,0];
	for(i=0;i<len;i++)
	{
		var c_bonus;
		if(i<combos[1])c_bonus=combo_bonus[0];
		else if(i<combos[2])c_bonus=combo_bonus[1];
		else if(i<combos[3])c_bonus=combo_bonus[2];
		else if(i<combos[4])c_bonus=combo_bonus[3];
		else if(i<combos[5])c_bonus=combo_bonus[4];
		else if(i<combos[6])c_bonus=combo_bonus[5];
		else c_bonus=combo_bonus[6];
		var note_value = 1;
		if(beatmap2[i][1]=="3")note_value=1.25;
		if(beatmap2[i][1]=="11")note_value=0.5;
		if(beatmap2[i][1]=="13")note_value=0.625;
		note_value=note_value*c_bonus;
		pos_notes_with_combo[9-parseInt(beatmap2[i][2])]=pos_notes_with_combo[9-parseInt(beatmap2[i][2])]+note_value;
	}
	//带combo权重总计
	var total_notes_with_combo = 0;
	for(i=0;i<9;i++)
		total_notes_with_combo+=pos_notes_with_combo[i];
	//保留三位
	total_notes_with_combo = Math.round(total_notes_with_combo*1000)/1000;
	for(i=0;i<9;i++)
		pos_notes_with_combo[i] = Math.round(pos_notes_with_combo[i]*1000)/1000;
	//长按note统计
	var long_note = 0;
	for(i=0;i<len;i++)
		if((beatmap[i]["effect"]=="3")|(beatmap[i]["effect"]=="13"))
			long_note += 1;	
	//滑键统计
	var swing_note = 0;
	for(i=0;i<len;i++)
		if((beatmap[i]["effect"]=="11")|(beatmap[i]["effect"]=="13"))
			swing_note += 1;	
	//星标统计
	var star_note = 0;
	for(i=0;i<len;i++)
		if(beatmap[i]["effect"]=="4")
			star_note += 1;	

	if (typeof bpm == "undefined")bpm = "0";
	else if(bpm.length>3)bpm = bpm.substr(bpm.length-3,3);
	bpm = parseInt(bpm);
	document.getElementById("songs").innerHTML =
		"<canvas id=\"myCanvas\" width=\"530\" height=\"300\" style=\"background:#FFF;position:relative;left:10px\">"+
		"您的浏览器不支持canvas</canvas><p id=\"buttom\"></p>";

	//组织页面来显示基本信息
    var in_html = "";
	in_html = in_html + "<p><img src=\""+ iconpath +"\" width=\"150px\" height=\"150px\"/></p>";
	in_html = in_html + "<div style=\"position:relative;left:180px;top:-160px;width:420px\">";
	in_html = in_html + "<p>"+ name + " - "+ difficulty;
	if(way=='1')	
		in_html = in_html + "<img onclick=\"confirm_filter2();\"style=\"cursor:pointer;position:absolute;left:400px\" src=\"back.jpg\"/></p>";
	else
		in_html = in_html + "<img onclick=\"confirm_search2();\"style=\"cursor:pointer;position:absolute;left:400px\" src=\"back.jpg\"/></p>";
	in_html = in_html + "<p>难度："+ get_stars(parseInt(level)) + "</p>";
	if(bpm!=0)	
		in_html = in_html + "<p>歌曲BPM："+bpm+"&nbsp;&nbsp;&nbsp;总计键数： "+ combo + "</p>";
	else
		in_html = in_html + "<p>（缺少歌曲BPM）&nbsp;&nbsp;&nbsp;总计键数："+ combo + "</p>";
	in_html = in_html + "<p>星标数：" + star_note + "&nbsp;&nbsp;长按数：" + long_note + "&nbsp;&nbsp;滑键数：" + swing_note + "</p></div>";
	in_html = in_html + "<p style=\"postion:relative;top:-150px;\">"; 
	in_html = in_html + "<audio controls src =" + musicpath + ">不支持audio控件</audio>";
	in_html = in_html + "<a style=\"position:relative;left:50px;\" href=\""+ path +"\">点击下载谱面文件（.json）</a></p>"
	var pos_note_results = "<div style=\"position:relative;top:-160px;\">"+
			"<table style=\"width:650px;font-size:12px;font-weight:200\"><tr bgcolor=\"#EEEEBB\" style=\"height:20px\">"+
				"<th bgcolor=\"#7070FF\" style=\"width:50px;height:20px\">位置</th>"+
				"<th style=\"width:50px;height:20px\">L4</th>"+
				"<th style=\"width:50px;height:20px\">L3</th>"+
				"<th style=\"width:50px;height:20px\">L2</th>"+
				"<th style=\"width:50px;height:20px\">L1</th>"+
				"<th style=\"width:50px;height:20px\">C</th>"+
				"<th style=\"width:50px;height:20px\">R1</th>"+
				"<th style=\"width:50px;height:20px\">R2</th>"+
				"<th style=\"width:50px;height:20px\">R3</th>"+
				"<th style=\"width:50px;height:20px\">R4</th>"+
				"<th bgcolor=\"#FF7070\" style=\"width:50px;height:20px\">总计</th>"+
			"</tr><tr bgcolor=\"#EEEEBB\" style=\"height:20px\"><th bgcolor=\"#7070FF\" style=\"width:50px;height:20px\">权重</th>";
	for(i=0;i<9;i++)
		pos_note_results+="<th style=\"width:50px;height:20px\">"+pos_notes_with_combo[i]+"</th>";
	pos_note_results+="<th bgcolor=\"#FF7070\" style=\"width:50px;height:20px\">"+total_notes_with_combo+"</th></table></div>"
	in_html = in_html + pos_note_results;
	in_html = in_html + "<div id=\"table\" style=\"position:relative;top:-150px;height:320px;width:650px\"></div>"
	document.getElementById("song_info").innerHTML = in_html;
	//--------------------------柱状分布图--------------------------
	var data = [{name : "L4",value : Math.round(pos_notes_with_combo[0]/total_notes_with_combo*10000)/100,color : '#4572a7'},
					{name : "L3",value : Math.round(pos_notes_with_combo[1]/total_notes_with_combo*10000)/100,color : '#aa4643'},
					{name : "L2",value : Math.round(pos_notes_with_combo[2]/total_notes_with_combo*10000)/100,color : '#89a54e'},
					{name : "L1",value : Math.round(pos_notes_with_combo[3]/total_notes_with_combo*10000)/100,color : '#80699b'},
					{name : "C" ,value : Math.round(pos_notes_with_combo[4]/total_notes_with_combo*10000)/100,color : '#3d96ae'},
					{name : "R1",value : Math.round(pos_notes_with_combo[5]/total_notes_with_combo*10000)/100,color : '#4572a7'},
					{name : "R2",value : Math.round(pos_notes_with_combo[6]/total_notes_with_combo*10000)/100,color : '#aa4643'},
					{name : "R3",value : Math.round(pos_notes_with_combo[7]/total_notes_with_combo*10000)/100,color : '#89a54e'},
					{name : "R4",value : Math.round(pos_notes_with_combo[8]/total_notes_with_combo*10000)/100,color : '#80699b'}];
					
	var chart = new iChart.Column2D(
		{render : 'table', data : data,
			title : {text : 'Note位置分布图', color : '#3e576f', fontsize : 15},
			subtitle : {text : '均为带Combo权重', color : '#6d869f', fontsize : 11},
			footnote : {text : 'ichartjs.com', color : '#909090', fontsize : 6, padding : '0 38'},
			width : 650, height : 320, background_color:'#fbfbfb', label : {fontsize:7, color : '#666666'},
			shadow : false, shadow_blur : 2, shadow_color : '#aaaaaa', shadow_offsetx : 1, shadow_offsety : 0, column_width : 62,
			sub_option : {listeners : {parseText : function(r, t) {return t + "%";}}, label : {fontsize:2, fontweight:200, color : '#4572a7'},
			border : {width : 2, color : '#ffffff'}},
			coordinate : {background_color : null, grid_color : '#c0c0c0', width : 450, axis : {color : '#c0d0e0', width : [0, 0, 1, 0]},
			scale : [{position : 'left', start_scale : 0, end_scale : 15, scale_space : 5, scale_enable : false, label : {fontsize:7, color : '#666666'}}]}});
	//*利用自定义组件构造左侧说明文本。
	chart.plugin(new iChart.Custom({
		drawFn:function(){
			var coo = chart.getCoordinate(),
			x = coo.get('originx'),
			y = coo.get('originy'),
			H = coo.height;
			chart.target.textAlign('center').textBaseline('middle').textFont('600 13px Verdana')
				.fillText('Note分布区域',x-40,y+H/2,false,'#6d869f', false,false,false,-90);}}));
	chart.draw();

	//准备画谱面
    if(beatmap.length <= 0)
    {
        document.getElementById("songs").innerHTML =
            "<h2 id=\"buttom\" style=\"position:relative;left:10px;height:700px;\">An Error Occured...</h2>";
        to_bottom();
        return;
    }

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
		var measures = Math.ceil(beatmap_length*1000/(4*time_beat))+1;
		var notes_cnt = new Array(measures);
		for(x=0;x<measures;x++)
			notes_cnt[x] = 0;	
		var time_axis = new Array(beatmap.length);
		for(x=0;x<beatmap.length;x++)
		{
			var tt = parseFloat(beatmap[x]["timing_sec"]);
			if((beatmap[x]["effect"]=="3")|(beatmap[x]["effect"]=="13"))
				tt += parseFloat(beatmap[x]["effect_value"]);
			tt = Math.floor(tt*1000);
			time_axis[x] = tt;
		}
		for(x=0;x<time_axis.length;x++)
		{
			for(y=0;y<measures;y++)
			{
				var temp_t = y*time_beat*4 + Math.floor(time_offset*1000);
				if (time_axis[x]<temp_t-1)
				{
					notes_cnt[y] += 1;
				} 
			}
		}
		
		while(k>0)
		{
			k = Math.floor((beatmap_length - i*time_ival/1000)*sp)+20;
			i = i + 1;
			if(i%(ival*4)==1)
			{
				var m = Math.floor(i/(ival*4));
				var t = m*time_beat/250+time_offset;
				t = Math.floor(t*1000);
				var tx1 = "Measure:" + m;
				var tx2 = "Time："+ t +"ms";
				var tx3 = notes_cnt[m];
				drawText(tx1,420,k-9);
				drawText(tx2,420,k+11);
				drawText(tx3,15,k+4)
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
					cxt.lineTo((9-pos)*40+70,time);
					cxt.stroke();	
				}
				cxt.moveTo((9-pos)*40+70,time);
				cnt = cnt + 1;
			}
		}
	}
	to_bottom();
}
		
function get_beatmaps(data)
{
	document.getElementById("song_info").innerHTML = "";
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
							var icon_asset = "http://r.llsif.win/"+data[i]["live_icon_asset"];
							var difficulty = data[i]["difficulty_text"];
							var level = data[i]["stage_level"];
							var name = data[i]["name"];
							switch(data[i]["attribute_icon_id"])
							{
								case 1:{innerhtml = innerhtml + "<p onclick=readbeatmap('1','" + 
									beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
									sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
									"') style=\"color:red;cursor:pointer\">";break;}
								case 2:{innerhtml = innerhtml + "<p onclick=readbeatmap('1','" + 
									beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
									sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
									"') style=\"color:green;cursor:pointer\">";break;}
								case 3:{innerhtml = innerhtml + "<p onclick=readbeatmap('1','" + 
									beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
									sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
									"') style=\"color:blue;cursor:pointer\">";break;}
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
						if ((data[i]["difficulty_text"] != "TECHNICAL")&((data[i]["difficulty_text"]==song_type)|(song_type=="0")))
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
								var icon_asset = "http://r.llsif.win/"+data[i]["live_icon_asset"];
								var difficulty = data[i]["difficulty_text"];
								var level = data[i]["stage_level"];
								var name = data[i]["name"];
								switch(data[i]["attribute_icon_id"])
								{
									case 1:{innerhtml = innerhtml + "<p onclick=readbeatmap('1','" + 
										beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
										sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
										"') style=\"color:red;cursor:pointer\">";break;}
									case 2:{innerhtml = innerhtml + "<p onclick=readbeatmap('1','" + 
										beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
										sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
										"') style=\"color:green;cursor:pointer\">";break;}
									case 3:{innerhtml = innerhtml + "<p onclick=readbeatmap('1','" + 
										beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
										sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
										"') style=\"color:blue;cursor:pointer\">";break;}
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
	document.getElementById("song_info").innerHTML = "";
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
					var icon_asset = "http://r.llsif.win/"+data[i]["live_icon_asset"];
					var difficulty = data[i]["difficulty_text"];
					var level = data[i]["stage_level"];
					var name = data[i]["name"];
					switch(data[i]["attribute_icon_id"])
					{
						case 1:{innerhtml = innerhtml + "<p onclick=readbeatmap('2','" + 
							beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
							sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
							"') style=\"color:red;cursor:pointer\">";break;}
						case 2:{innerhtml = innerhtml + "<p onclick=readbeatmap('2','" + 
							beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
							sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
							"') style=\"color:green;cursor:pointer\">";break;}
						case 3:{innerhtml = innerhtml + "<p onclick=readbeatmap('2','" + 
							beatmap_path + "','" + data[i]["live_track_id"] + "','" + difficulty + "','" + level + "','" + 
							sound_asset + "','" + icon_asset + "','" + data[i]["s_rank_combo"] + 
							"') style=\"color:blue;cursor:pointer\">";break;}
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