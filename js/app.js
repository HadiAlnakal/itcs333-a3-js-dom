(function () {
  'use strict';

  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var errorMsg = document.getElementById('error-msg');
  var list = document.getElementById('todo-list');
  var counter = document.getElementById('counter');
  var filterAll = document.getElementById('filter-all');
  var filterActive = document.getElementById('filter-active');
  var filterDone = document.getElementById('filter-done');

  var currentFilter = 'all';

  function updateCounter() {
    var left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left + ' item(s) left';
  }

  function addItem(text) {
    var li = document.createElement('li');

    var span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'delete-btn';
    btn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

       errorMsg.classList.add('hidden');
    addItem(text);
    input.value = '';
    applyFilter();
    updateCounter();
  });

  list.addEventListener('click', function (e) {
    var target = e.target;
    var li = target.closest('li');

    if (!li) {
      return;
    }

       if (target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }

    applyFilter();
    updateCounter();
  });


    function applyFilter() {
    var items = list.querySelectorAll('li');

    items.forEach(function (li) {
      var done = li.classList.contains('completed');
      var show = true;

      if (currentFilter === 'active') {
        show = !done;
      } else if (currentFilter === 'done') {
        show = done;
      }

      li.style.display = show ? '' : 'none';
    });
  }

  function setFilter(name) {
    currentFilter = name;
    applyFilter();
  }

  filterAll.addEventListener('click', function () {
    setFilter('all');
  });

  filterActive.addEventListener('click', function () {
    setFilter('active');
  });

  filterDone.addEventListener('click', function () {
    setFilter('done');
  });

  updateCounter();


  

})();