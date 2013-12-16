/* ----------------------------------------------------------------------------------------------- 
	My-Behance
	A Javascript file to get a Behance user's projects, lightweight and easy to use.
	by Marcelo Guzman (marceloguzman.com)
	follow this project at: https://github.com/marceloguzman/my-behance
 ----------------------------------------------------------------------------------------------- */


	var behance_username = "higher"; 				// behance user
	var selector = "behance_feed"; 					// ID of the HTML tag 
	var use_description = false; 					// use true to get a description, false shows only images and links
	var full_description = false; 					// use true to get the full description instead of the content snippet
	var query_msg = "Querying Behance feed..."; 	// message when requesting behance data
	var error_msg = "Error while loading feed..."; 	// message when an error occurs
	
	
/*  ---- don't edit below this line unless you know what to edit ---------------------------------------------------------------- */


(function () {
	var random = "be" + getRandomInt(1000000, 999999999);
	var behance_url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A//www.behance.net/" + behance_username + ".xml&num=10&v=1.0&callback=" + random;
	append_script(behance_url);
	window[random] = function (e) {
		var box = document.getElementById(selector);
		box.innerHTML = "<div class='behance_main'><h4>" + query_msg + "</h4></div>";
		if (e.responseStatus === 200) {
			box.innerHTML = "<div class='behance_main'>" + format_results(e) + "</div>";
		} else {
			box.innerHTML = "<div class='behance_main'><h4>" + error_msg + "</h4></div>";
		}
	}
}());
/*  ------------------------------------------------------------------------  */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*  ------------------------------------------------------------------------  */
function append_script(url) {
	var script = document.createElement("script");
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}
/*  ------------------------------------------------------------------------  */
function format_results(e) {
	var body = "<div class='behance_entries'>";
	var link = e.responseData.feed.link;
	var regexx =  new RegExp("<a.*?<\/a>","i"); 
	var imgg ="", longdesc="", entry="", content="", description_text="";
	
	
	for (var i = 0; i < e.responseData.feed.entries.length; i++) {
		entry = e.responseData.feed.entries[i];
		content = entry.content.replace(/style=".*?"/, "");
		content = content.replace(/>/, "></a>");
		content = "<a href='" + entry.link + "'>" + content;
		image = regexx.exec(content);
		longdesc= content.replace(regexx, "")
		longdesc= longdesc.replace("<br>", "")
		if (use_description ==true) {
		if (full_description ==true) {
		description_text ="<p>" + longdesc +  "</p>";
		} else {
		description_text ="<p>"+ entry.contentSnippet + "</p>";
		}
		}
		body += "<div class='behance_entry'>" + image + "<a target='_blank' class='titlelink' href='" + entry.link + "'>" + entry.title + "</a>" + description_text + "</div>";
	}
	body += "</div>";
	return body;
}