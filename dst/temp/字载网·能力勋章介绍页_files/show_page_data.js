var thisPage = 0; //当前页面
var theme = "";//当前主题
var htmlstr = "";
var shuju = shuju_ch;//道具介绍数据
var inputing=false;//当前是否在进行中文输入
var itemNeedSort = false;//是否需要对数据进行排序
var helptimes;//操作说明弹出标识
//点击道具列表按钮
$("#item_button").on("click", function() {
	thisPage = 0;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#item_button").addClass("xuanzhong");
	$("#searchbox").val("");
	spawnList();
	$('#game_list').scrollTop(0);
	$('#changescreen').show()
})
$("#item_button").siblings().on("click", function() {
	$('#changescreen').hide()
})
//点击更新日志按钮
$("#update_button").on("click", function() {
	thisPage = 1;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#update_button").addClass("xuanzhong");
	$("#searchbox").val("");
	spawnLog();
	$('#game_list').scrollTop(0);
})
//点击作者留言按钮
$("#author_button").on("click", function() {
	thisPage = 2;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#author_button").addClass("xuanzhong");
	$("#searchbox").val("");
	spawnMessage();
	$('#game_list').scrollTop(0);
})
//点击模组说明按钮
$("#explain_button").on("click", function() {
	thisPage = 3;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#explain_button").addClass("xuanzhong");
	$("#searchbox").val("");
	spawnExplain();
	$('#game_list').scrollTop(0);
})
//常见问题
$("#modlist_button").on("click", function() {
	thisPage = 4;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#modlist_button").addClass("xuanzhong");
	$("#searchbox").val("");
	spawnQandA();
	$('#game_list').scrollTop(0);
})
//打赏按钮
$("#rewardbutton").click(function() {
	thisPage = 5;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#rewardbutton").addClass("smallbuttonON");
	$("#searchbox").val("");
	spawnReward();
	$('#game_list').scrollTop(0);
})
//更多模组
$("#morebutton").click(function() {
	thisPage = 6;
	$(".navigation_button").removeClass("xuanzhong");
	$(".smallbutton").removeClass("smallbuttonON");
	$("#morebutton").addClass("smallbuttonON");
	$("#searchbox").val("");
	spawnModList();
	$('#game_list').scrollTop(0);
})
//操作说明
$("#helpbutton").click(function() {
	spawnAnalysis(97);
})
//关闭解析
$("#analysis_bg").click(function() {
	$(".analysis_box").hide();
})
//切换模式
$("#game_level").on("change",function(){
	showLevelInfo();
})
// 切换布局 
$("#changescreen").click(function() {
	let str = ''
	// 切换class 用以标记
	$(this).toggleClass('isscreen')
	// 判断class标记来切换样式表的引用路径
	if($(this).hasClass('isscreen')){
		// 线上用注释掉的代码.
		// $('#isscreen').attr('href', '')
		$('#isscreen').attr('href', str + '')
	}else{
		// $('#isscreen').attr('href', 'css/screen.css')
		$('#isscreen').attr('href', str + 'css/screen.css')
	}
})
//生成顶部提示
function appendTips(title,content){
	var htmlstr="";
	htmlstr += "<div class='loading_box'><b>" + title +
		"</b><div class='liuyan'><p class='sj2'>";
	htmlstr += content + "</p></div></div>";
	$("#game_list").append(htmlstr);
}

var imgs = new RegExp("<imgs>","g");//g,表示全部替换。
var imge = new RegExp("<imge>","g");
var sj2 = new RegExp("<sj2>","g");
var cube = new RegExp("◆","g");
//制表
var tb1 = new RegExp("<tbs>","g");//<table><tr><th>
var tb2 = new RegExp("<-->","g");//</th><th>
var tb3 = new RegExp("<th><sj2>","g");//</th></tr><tr><td>
var tb4 = new RegExp("<->","g");//</td><td>
var tb5 = new RegExp("<td><sj2>","g");//</td></tr><tr><td>
var tb6 = new RegExp("<tbe>","g");//</td></tr></table>
var tb7 = new RegExp("<th><br>","g");//</th></tr><tr><td>
var tb8 = new RegExp("<td><br>","g");//</td></tr><tr><td>
var tb9 = new RegExp("<tbe><br>","g");//</td></tr></table>
//标签转义(降低文本数据大小)
function escapeHtmlStr(str){
	if(str.indexOf("<tbs>")>=0){
		str = str.replace(tb1,"<table><tr><th>");
		str = str.replace(tb2,"</th><th>");
		str = str.replace(tb3,"</th></tr><tr><td>");
		str = str.replace(tb7,"</th></tr><tr><td>");
		str = str.replace(tb4,"</td><td>");
		str = str.replace(tb5,"</td></tr><tr><td>");
		str = str.replace(tb8,"</td></tr><tr><td>");
		str = str.replace(tb9,"</td></tr></table>");
		str = str.replace(tb6,"</td></tr></table>");
	}
	str = str.replace(imgs,"<br>(手机用户可能会看不清，点击图片可查看原图~)<br><img class='showimg' src='img/");
	str = str.replace(imge,".png\'>");
	str = str.replace(sj2,"</p><p class='sj2'>");
	str = str.replace(cube,"&nbsp;&nbsp;◆");
	return str;
}

var ub1 = new RegExp("{","g");//g,表示全部替换。
var ub2 = new RegExp("}","g");//g,表示全部替换。
//关联文本转义
function escapeTagStr(str){
	str = str.replace(ub1,"<u class='tag_b'>");
	str = str.replace(ub2,"</u>");
	return str;
}

//是否拥有该字段(字段名,索引)
function hasField(str,i){
	return (str in shuju[i] && shuju[i][str] != "");
}
//插入简易模式字段(简易字段,普通字段,文字,索引)
function addField(str1,str2,txt,i){
	var newstr="";
	if(hasField(str1,i)){
		newstr += `
			<div class='easy_info duanluo'>
				<b>`+txt+`：</b>
				<div class="spanwarp">
					<span>` + escapeHtmlStr(shuju[i][str1]) + `</span>
				</div>
			</div>
				`;
		newstr += `
			<div class='nomal_info duanluo'>
				<b>`+txt+`：</b>
				<div class="spanwarp">
					<span>` + escapeHtmlStr(shuju[i][str2]) + `</span>
				</div>
			</div>
				`;
	} else {
		newstr += `
		<div class='duanluo'>
			<b>`+txt+`：</b>
			<div class="spanwarp">
				<span>` + escapeHtmlStr(shuju[i][str2]) + `</span>
			</div>
		</div>
		`;
	}
	return escapeTagStr(newstr);
}

spawnList(); //默认加载道具列表
// spawnAnalysis(97);//默认显示操作说明书

if(window.localStorage){
	var storage = window.localStorage;
	helptimes = storage.getItem("helptimes");
	if(helptimes == null){
		spawnAnalysis(97);
	}else{
		$("#no_alert_again").hide();
	}
	
	//不再提示
	$("#no_alert_again u").click(function() {
		helptimes = 1;
		storage.setItem("helptimes",1)
		$("#no_alert_again").hide();
		$(".analysis_box").hide();
	})
}


//生成道具列表s
function spawnList(ignoreSort) {
	if(itemNeedSort&&!ignoreSort) doItemSort();//对数据进行排序
	$("#game_list").html("");
	appendTips("温馨提示","介绍页内容会和模组同步更新，如果你发现介绍页内容不是最新版本，请按Ctrl+F5强制刷新页面或清除浏览器缓存后再重新访问~如若发现介绍页内容有误，欢迎加群指正！群号：967226714</p><p class='sj2'><span class='warm_prompt'>※扩展栏后面的按钮支持点击，点击后可查看更多详细内容！</span>");
	
	var biaoqianId = 0;
	for (var i = 0; i < shuju.length; i++) {
		if (theme=="" || shuju[i].item_type.search(theme) != -1) {
			htmlstr = "";
			var img = hasField('item_img',i)?shuju[i].item_img:shuju[i].item_code
			htmlstr +=
				`<div class='game_box card'>
					<div class='game_img sprite ` + img + `'></div>
					<div class='game_jianjie'>`;
			htmlstr += `<div class='duanluo'>
							<b>名称：</b>
							<span>` + shuju[i].item_name + `</span>
						</div>
						<div class='duanluo'>
							<b>代码：</b>
							<span>` + shuju[i].item_code + `</span>
							<span class='copy_code' value='` + shuju[i].item_code + `'>复制</span>
						</div>
						`;
			
			if (hasField('analysis_key',i)){
				var id_arr = shuju[i].analysis_key.split("|");//索引数组
				// console.log('id_arr',i,id_arr)
				htmlstr += `
					<div class='duanluo'>`
				for(var j=0;j<id_arr.length;j++){
					if(j==0){
						htmlstr += `
							<b>扩展：</b>
							<div class="spanwarp">
							<b class='warm_prompt'>千万别点→</b>`;
						
					}
					var analysisKey = mod_analysis[parseInt(id_arr[j])].analysis_key; //密钥
						// htmlstr += "<span class='analysis_button' value='" + id_arr[j] + "'>"+analysisKey+"</span>";
						htmlstr += `
							<span class='analysis_button' value='` + id_arr[j] + `'>
								<u>`+analysisKey+`</u>
							</span>`;
				}
				htmlstr += `
					</div></div>`
				// htmlstr+="<b>←(可以点开)</b>";
			}
			htmlstr += addField('easy_function','item_function','设定',i);
			if (hasField('item_cailiao',i)) htmlstr += addField('easy_cailiao','item_cailiao','配方',i);
			if (hasField('item_keji',i)) htmlstr += `
				<div class='duanluo'>
					<b>科技：</b>
					<div class="spanwarp">
						<span>` + escapeTagStr(shuju[i].item_keji) + `(` + shuju[i].item_zhizuolan + `)</span>
						</div>
					</div>
				`;
			if (hasField('item_drop',i)) htmlstr += `
				<div class='duanluo'>
					<b>掉落：</b>
					<div class="spanwarp">
						<span>` + escapeTagStr(shuju[i].item_drop) + `</span>
					</div>
				</div>
				`;
			if (hasField('item_huoqu',i)) htmlstr += addField('easy_huoqu','item_huoqu','获取',i);
			if (hasField('item_yinke',i)) htmlstr += `
				<div class='duanluo'>
					<b>印刻：</b>
					<div class="spanwarp">
						<span>` + escapeTagStr(shuju[i].item_yinke) + `</span>
					</div>
				</div>
				`;
			if (hasField('item_duidie',i)) htmlstr += `
				<div class='duanluo'>
					<b>堆叠：</b>
					<div class="spanwarp">
						<span>` + escapeTagStr(shuju[i].item_duidie) + `</span>
					</div>
				</div>
				`;
			if (hasField('item_naijiu',i)) htmlstr += addField('easy_naijiu','item_naijiu','耐久',i);
			if (hasField('item_special',i)) htmlstr += `
				<div class='duanluo'>
					<b>特殊：</b>
					<div class="spanwarp">
						<span>` + escapeTagStr(shuju[i].item_special)+ `</span>
					</div>
				</div>
				`;
			if (hasField('item_tags',i)){
				var id_arr = shuju[i].item_tags.split("|");//索引数组
				htmlstr += `
					<div class='duanluo'>
					<b>关联：</b>
					<div class="spanwarp iswarp">`;
				for(var j=0;j<id_arr.length;j++){
					htmlstr += `<span class='tag_button' value='` + id_arr[j] + `'><u>` + id_arr[j] + `</u></span>`;
				}
				htmlstr += `</div></div>`;
			}
			htmlstr += `
				</div>
			</div>
				`;
			$("#game_list").append(htmlstr);
		}
	}
	// 检索所有card
	let card_list = $('.card')
	// 包一层div
	let copyDom = '<div class="card_list"></div>'
	// 拷贝一份
	$("#game_list").append(copyDom);
	$("#game_list .card_list").append(card_list);
	// 删除节点remove
	$("#game_list>.card").remove();
	
	// 判断是否大屏滚动
	let spanArr = $("#game_list ").find('.spanwarp span')
	// 数字为(screen)样式表的多行滚动最大高度-1
	let maxHeight = 127
	for(let i in spanArr){
		if(spanArr[i].offsetHeight > maxHeight){
			$(spanArr[i]).parent().addClass('iswarp')
		}
	}
	
	//复制
	$(".copy_code").on("click", function() {
		var copyVal = $(this).attr("value");
		Clipboard.copy(copyVal);
	})
	
	//解析
	$(".analysis_button").on("click", function() {
		var key = $(this).attr("value");
		spawnAnalysis(key);
	})
	
	//关联
	$(".tag_button").on("click", function() {
		var key = $(this).attr("value");
		// spawnAnalysis(key);
		$("#searchbox").val(key);
		doSearch();
	})
	
	//关联
	$(".game_jianjie").on("click", ".tag_b", function() {
		// var key = $(this).attr("value");
		var key = $(this).text();
		if(key!=$("#searchbox").val()){
			$("#searchbox").val(key);
			doSearch();
		}
	})
	
	$('#game_list').scrollTop(0);
	showLevelInfo();//根据难度模式显示内容
}
//生成日志列表
function spawnLog() {
	$("#game_list").html("");
	var biaoqianId = 0;
	var updatelog = updatelog_ch;
	appendTips("温馨提示","介绍页内容会和模组同步更新，如果你发现介绍页内容不是最新版本，请按Ctrl+F5强制刷新页面或清除浏览器缓存后再重新访问~如若发现介绍页内容有误，欢迎加群指正！群号：967226714");
	for (var i = 0; i < updatelog.length; i++) {
		htmlstr = "";
		htmlstr += "<div class='game_box card'><div class='update_log'>";
		htmlstr += "<b>版本：</b>" + updatelog[i].update_editon;
		htmlstr += "<br><b>日期：</b>" + updatelog[i].update_date;
		// htmlstr += "<br><b>内容：</b><p class='sj1'>1." + updatelog[i].update_log1;
		var logstr = updatelog[i].update_log1;
		for(var j=2;j<=5;j++){
			if (updatelog[i]['update_log'+j] != "") logstr += "</p><p class='sj1'>"+j+"." + updatelog[i]['update_log'+j];
		}
		logstr = escapeHtmlStr(logstr);
		htmlstr += "<br><b>内容：</b><p class='sj1'>1." + logstr;
		htmlstr += "</p></div></div>";
		$("#game_list").append(htmlstr);
	}
}
//生成留言列表
function spawnMessage() {
	$("#game_list").html("");
	var authorMessage = authorMessage_ch;
	htmlstr = "";
	for (var i = 0; i < authorMessage.length; i++) {
		htmlstr += "<div class='loading_box card'><b>" + authorMessage[i].message_title +
			"</b><div class='liuyan'><p class='sj2'>";
		var message_data = authorMessage[i].message_data;
		message_data = escapeHtmlStr(message_data);
		htmlstr += message_data + "</p></div></div>";
	}
	$("#game_list").append(htmlstr);
}
//生成模组说明
function spawnExplain() {
	$("#game_list").html("");
	var modExplain = mod_explain;
	htmlstr = "";
	for (var i = 0; i < modExplain.length; i++) {
		htmlstr += "<div class='loading_box card'><b>" + modExplain[i].explain_title +
			"</b><div class='shuoming'><p class='sj2'>";
		var explain_data = modExplain[i].explain_data;
		explain_data = escapeHtmlStr(explain_data);
		htmlstr += explain_data + "</p></div></div>";
	}
	htmlstr += "</div>";
	$("#game_list").append(htmlstr);
}
//生成模组列表
function spawnModList() {
	$("#game_list").html("");
	var biaoqianId = 0;
	var modlist = mod_list;
	for (var i = 0; i < modlist.length; i++) {
		htmlstr = "";
		htmlstr += "<div class='mod_box card'><img class='mod_img' src='img/"+modlist[i].mod_img;
		htmlstr += ".png'><div class='mod_jianjie'><b>名称：</b>" + modlist[i].mod_name;
		htmlstr += "<br><b>作者：</b>" + modlist[i].mod_author;
		htmlstr += "<br><b>发布日期：</b>" + modlist[i].mod_date;
		htmlstr += "<br><b>简介：</b>" + modlist[i].mod_introduction;
		htmlstr += "<br><a class='modpage_link' href='"+modlist[i].mod_link;
		htmlstr += "'>前往介绍页>></a></div></div>";
		$("#game_list").append(htmlstr);
	}
}
//生成打赏列表
function spawnReward() {
	$("#game_list").html("");
	htmlstr = "";
	htmlstr += "<div class='loading_box'><b>感谢支持</b><div class='liuyan'><p class='sj2'>如果你喜欢这个Mod的话，欢迎打赏~你的支持就是我最大的动力！</p></div>";
	for(var i=1;i<=4;i++){
		htmlstr += "<img class='dashang_img' src='img/weixin"+ i +".png' >";
	}
	htmlstr += "</div>";
	$("#game_list").append(htmlstr);
}
//生成常见问题列表
function spawnQandA() {
	$("#game_list").html("");
	var questionsAnswers = questions_answers;
	for (var i = 0; i < questionsAnswers.length; i++) {
		if(i==0){
			appendTips(questionsAnswers[i].questions,questionsAnswers[i].answers);
		}else{
			htmlstr = "";
			htmlstr += "<div class='game_box card'><div class='update_log'>";
			htmlstr += "<b>问：<span>" + questionsAnswers[i].questions;
			var answers = questionsAnswers[i].answers;
			answers = escapeHtmlStr(answers);
			htmlstr += "</span><br>答：</b><span>" + answers +"</span></div></div>";
			$("#game_list").append(htmlstr);
		}
	}
}
//生成解析
function spawnAnalysis(key){
	var isAnalysisKey = false;
	if(key==97&&helptimes==null) $("#no_alert_again").show();
	else $("#no_alert_again").hide();
	for (var i = 0; i < mod_analysis.length; i++) {
		//检索是不是解析密钥,如果是则显示解析,不是则显示正常搜索结果
		var analysisID = mod_analysis[i].analysis_id; //密钥id
		if (key == analysisID) {
			isAnalysisKey = true;
			var analysisTitle = mod_analysis[i].analysis_title; //解析标题
			var analysisData = mod_analysis[i].analysis_data; //解析内容
			//解析URL
			var url_s = analysisData.indexOf('<urls>');
			var url_e = analysisData.indexOf('<urle>');
			if (url_s>-1 && url_e>-1){
				// alert(analysisData.substring(url_s+6,url_e));
				window.open(analysisData.substring(url_s+6,url_e));
				break;
			}
			analysisData = escapeHtmlStr(analysisData);
			$(".analysis_box").show();
			$("#analysis_info").html("");
			htmlstr = "";
			htmlstr += "<div class='loading_box'><b>" + analysisTitle +
				"</b><div class='shuoming'><p class='sj2'>";
			htmlstr += analysisData + "</p></div></div>";
			$("#analysis_info").append(htmlstr);
			break;
		}
	}
	//解析
	$(".showimg").on("click", function() {
		var key = $(this).attr("src");
		var tempwindow=window.open('_blank');
		tempwindow.location=key;
		console.log(key);
	})
	return isAnalysisKey;
}

//根据难度显示内容
function showLevelInfo(){
	var level_val=$("#game_level").children('option:selected').val();
	if(level_val=="default"){//默认模式
		$(".easy_info").hide();
		$(".nomal_info").show();
	}else{//简易模式
		$(".easy_info").show();
		$(".nomal_info").hide();
	}
}

//选择主题分类
$("#game_theme").on("change",function(){
	theme=$(this).children('option:selected').val();
	if(thisPage==0){
		spawnList();
		$("#searchbox").val("");
	}
})

//按更新版本排序
function sortVersion(a,b) {
	if (b.update_version>a.update_version) return 1;
	else if(a.update_version==b.update_version) return b.item_id-a.item_id;
	else return -1;
}
//按ID排序
function sortId(a,b) {
	return a.item_id-b.item_id;
}
//对item进行排序
function doItemSort(){
	var sort_val=$("#game_sort").children('option:selected').val();
	if(thisPage==0){
		if(sort_val=="default"){
			shuju.sort(sortId);
		}
		else{
			shuju.sort(sortVersion);
		}
		itemNeedSort = false;
	}
}

//排序模式
$("#game_sort").on("change",function(){
	itemNeedSort = true;
	if(thisPage==0){
		spawnList();
		$("#searchbox").val("");
	}
})

//元素置顶
function itemToFirst(searchText){
	if(searchText=="") return false;
	for (var i = 0; i < shuju.length; i++) {
		if (shuju[i].item_name == searchText) {
			shuju.unshift(shuju.splice(i,1)[0]);
			itemNeedSort = true;
			return true;
		}
	}
}

//检索函数
function doSearch(){
	// console.log(new Date().getMilliseconds());
	if(inputing) return;
	var isAnalysisKey = false;
	var searchText = $("#searchbox").val();
	// isAnalysisKey = spawnAnalysis(searchText);//尝试生成解析
	if (!isAnalysisKey) {
		if(thisPage==0){
			if(searchText=="") theme=$("#game_theme").children('option:selected').val();
			else theme="";
			spawnList(itemToFirst(searchText));//道具列表
		}else if(thisPage==1){
			spawnLog();//更新日志
		}else if(thisPage==4){
			spawnQandA();//常见问题
		}
		if(searchText!=""){
			var regExp = new RegExp(searchText, "igm");//创建正则表达式igm
			var searchIndex = ".game_jianjie span";
			if(thisPage==1) searchIndex = ".update_log p";
			else if(thisPage==4) searchIndex = ".update_log span";
			$(searchIndex).not('.copy_code').not('.analysis_button').not('.tag_button').each(function()//遍历文字；
			{
				var html = $(this).html();
				var newHtml = html.replace(regExp, "<span class='search_sign' >"+searchText+"</span>");//将找到的关键字替换，加上highlight属性；
				$(this).html(newHtml);//更新内容
			});
		}
		$(".game_box.card").hide().filter(":contains('" + searchText + "')").show();
	}
}
//开始中文输入法输入
$("#searchbox").on('compositionstart', function() {
	// console.log('compositionstart');
	inputing=true;
});
//结束中文输入法输入
$("#searchbox").on('compositionend', function() {
	// console.log('compositionend');
	inputing=false;
	doSearch();
});
//检索框内容变更
// $("#searchbox").on('input propertychange', doSearch);
var searchTimer;
$("#searchbox").on('input propertychange', function(){
	clearInterval(searchTimer);
	searchTimer = setTimeout(doSearch,400);//延迟400毫秒检索,减少性能浪费
});