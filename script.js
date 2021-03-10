
const modal =document.getElementById('modal');
const modalShow =document.getElementById('show-modal');
const modalClose =document.getElementById('close-modal');
const bookmarkForm =document.getElementById('bookmark-form');
const websiteNameEl =document.getElementById('website-name');
const websiteUrlEl =document.getElementById('website-url');
const bookmarksContainer =document.getElementById('bookmarks-container');


let bookmarks = [];



function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

modalShow.addEventListener('click', showModal);

modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));

window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));


function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if(!nameValue || !urlValue) {//  if both of these were not added
    alert('please submit values for both fields mate.');
    return false
  }

  if(!urlValue.match(regex)) {
    alert('please provide a valid web adress');
    return false;
  }

  return true;
}


function buildBookmarks(){

  bookmarksContainer.textContent = '';


  bookmarks.forEach((bookmark)=>{
    const {name,url}=bookmark;

    const item = document.createElement('div');
    item.classList.add('item');


    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delet bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');

    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');

    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    linkInfo.append(favicon,link);
    item.append(closeIcon,linkInfo);

    bookmarksContainer.appendChild(item);
  });
}


function fetchBookmarks() {

  if(localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {

    bookmarks = [
      {
        name: 'Jacinto Design',
        url: 'https://jacinto.design',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if(bookmark.url === url) {

      bookmarks.splice(i, 0);
  }
});
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}



// 4*b Handle Data from Form
function storeBookmark(e){
  e.preventDefault();
  // console.log(e);
  // 4*c
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  // 4*c1  here we try to help users to be allowed to add ankatak without htt
  if(!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  // console.log(nameValue,urlValue);
  // 5*b calling the function in 5*a
  // validate(nameValue, urlValue);
  // 6*b
  if(!validate(nameValue, urlValue)) { // if not valid name and url were added
    return false;
  }
  // 7*b
  // when the above if is alright then it comes to this stage
  const bookmark = { // we have here bookmark object, then we pass this object to the arrey seen 7*c
    name: nameValue,
    url: urlValue,
  };
  // 7*c
  bookmarks.push(bookmark);
  // console.log(bookmarks);
  // 8*b
  // console.log(JSON.stringify(bookmarks));

  // 8*a push what we have to the localStorage
  // localStorage.setItem('bookmarks', bookmarks); // here the data is saved as a string, to appear what we want (the data) we use JSON method
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // here the data is saved as a string, to appear what we want (the data) we use JSON method

  // 9*b
  fetchBookmarks();

  // 7*c1 we reset the boomark form
  bookmarkForm.reset();
  websiteNameEl.focus(); // bring us back to websiteNameEl
}

// 4*a 94v Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// 9*c we use this function here too as well (to see what is there when you open at the begining)
fetchBookmarks();
