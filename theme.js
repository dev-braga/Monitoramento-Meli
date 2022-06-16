const chk = document.querySelector('input')
const rootElement = document.documentElement
const image = document.querySelector('#logo')
 
const lighTheme = {
    '--color-background' : '#FFF',
    '--text-color': '#A1A1A1',
    '--shadow-color': '#eee'
}

const darkTheme = {
    '--color-background' : 'rgb(43, 42, 51)',
    '--text-color': '#FFF',
    '--shadow-color': 'rgb(63, 62, 77)'
}

chk.addEventListener('change', () => {

    const isChecked = chk.checked
    
    if(isChecked){
        changeTheme(darkTheme)
        image.setAttribute('src', './img/logomsrnoturno.png')
    }
    else{
        changeTheme(lighTheme)
        image.setAttribute('src', './img/logomsr.png')
    }
   
})  


function changeTheme(theme){
   // Alteração
   for (let prop in theme ){
       changeProp(prop, theme[prop])
   }

}

function changeProp(property, value){
    rootElement.style.setProperty(property, value)
}

$("input[type='checkbox']").prop('checked', false);