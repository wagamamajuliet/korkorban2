function addcart(open) {
	location.href=open;
	return false;
	open.preventDefault();
}
function click() {
         return;
    }
// $('#addCart').click(function(e){
	$("#addCart").removeAttr("href");
// })