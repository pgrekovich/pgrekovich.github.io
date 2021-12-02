const checkboxesList = document.querySelectorAll('input[type="checkbox"]');

let lastChecked = null

function handleCheck(e) {
    if(e.shiftKey && this.checked) {
        let inBetween = false
        checkboxesList.forEach(checkbox => {
            console.log(checkbox)
            if(checkbox === this || checkbox === lastChecked) {
               inBetween = !inBetween 
               console.log('=')
            }
            if(inBetween) {
                checkbox.checked = true;
            }
        })
    }
    lastChecked = this
}

checkboxesList.forEach(el => {
    el.addEventListener('click', handleCheck)
})