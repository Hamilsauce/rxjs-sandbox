const input1 = document.querySelector('#input1');
const editable1 = document.querySelector('.editable1');
const selectAllText = (e) => {

  window.getSelection().selectAllChildren(e.target)
console.log('made it after selection, e:', e.target);
  
}

const handleClick = (e) => {
  selectAllText(e)
  // e.target.select()
  console.log('after selctall in handle click', e)
}

editable1.addEventListener('click', selectAllText)
editable1.addEventListener('click', handleClick)
input1.addEventListener('click', handleClick)