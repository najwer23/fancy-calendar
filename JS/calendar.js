window.onload = function () {

    let field = [".yearTens", ".yearThousands", ".yearUnits", ".monthRow", ".fourRow", ".dayUnits"]
    for (let i=0; i<field.length; i++) {
        document.querySelectorAll(''+field[i]+'').forEach(e => {
            e.addEventListener('click', function () {
                check(e)
            })
        });
    }
    


    function check(e){
        let val = e.textContent;
        console.log(e.className+" "+val)
    }
}