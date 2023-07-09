function xIconColor(index) {
    let numb = index;
    let pfad = document.getElementById('xIconPath');

    if(numb == 1){
        pfad.setAttribute('stroke', '#29abe2');    
    }else {
        pfad.setAttribute('stroke', '#2A3647'); 
    }
}