// старый файл

appInit();

function appInit() {
  const MIN_COUNT = 4;
  const MAX_COUNT = 100;
  const DEFAULT_COUNT = 16;
  const TIME_LEFT = 60;
  let app_data = [];
  let first = null;
  let second = null;
  let app = document.getElementById('app');
  app.innerHTML = '';
  renderInitForm();

  function renderInitForm() {
    let form = document.createElement('form')
    form.classList.add('initForm');

    let renderFormControl = (title = '') => {
      let form_control = document.createElement('div');
      form_control.classList.add('form-control');
      if (title.length > 0) {
        form_control.innerHTML = '<h4>' + title + '</h4>';
      }
      return form_control;
    }

    let count = renderFormControl('Количество карточек');
    let count_input = document.createElement('input');
    count_input.name = 'count';
    count_input.type = 'range';
    count_input.min = String(MIN_COUNT);
    count_input.max = String(MAX_COUNT);
    count_input.step = '2';
    count_input.value = String(DEFAULT_COUNT);
    let count_value = document.createElement('div');
    count_value.innerHTML = '<span>' + count_input.value + '</span>';
    count_input.addEventListener('input', () => {
      count_value.innerHTML = '<span>' + Number(count_input.value) + '</span>';
    });
    count.append(count_value);
    count.append(count_input);

    let timer = renderFormControl('Включить таймер');
    let timer_input = document.createElement('input');
    timer_input.name = 'timer';
    timer_input.type = 'checkbox';
    timer.append(timer_input);

    let submit = renderFormControl();
    let button = document.createElement('button');
    button.textContent = 'Начать';
    submit.append(button);

    form.append(count);
    form.append(timer);
    form.append(submit);
    app.append(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      app.innerHTML = '';
      let app_data_count = Number(form.count.value)
      let timer;
      renderBoard();
      initData();
      if (form.timer.checked) {
        setTimer();
      }

      function renderBoard() {
        let board = document.createElement('div')
        board.classList.add('board');
        const rows = Math.floor(Math.sqrt(app_data_count));
        const cols = app_data_count / rows;
        let id = 0;
        for (let i = 0; i < rows; i++) {
          let row = document.createElement('div');
          row.classList.add('row');
          board.append(row);
          for (let j = 0; j < cols; j++) {
            let col = document.createElement('div')
            col.classList.add('col');
            col.dataset.id = id.toString();
            col.addEventListener('click', checkData);
            id++;
            row.append(col);
          }
        }
        app.append(board);

        function checkData() {
          if (this.classList.contains('open')) {
            return true
          }
          this.classList.add('open');
          this.innerHTML = '<span>' + app_data[this.dataset.id] + '</span>';
          if (first !== null && second !== null) {
            let close = (id) => {
              let col = app.querySelector('[data-id="' + id + '"]');
              col.classList.remove('open');
              col.innerHTML = '';
            }
            close(first);
            close(second);
            first = this.dataset.id;
            second = null;
            return true;
          }
          if (first === null) {
            first = this.dataset.id;
          } else {
            second = this.dataset.id;
            if (app_data[first] === app_data[second]) {
              first = null;
              second = null;
              if (app.querySelectorAll('.open').length === app.querySelectorAll('.col').length) {
                clearInterval(timer);
                appRestart();
              }
            }
          }
          return true;
        }

      }

      function initData() {
        for (let i = 0; i < app_data_count / 2; i++) {
          app_data[i] = i;
          app_data[i + app_data_count / 2] = i;
        }
        for (let i = app_data.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [app_data[i], app_data[j]] = [app_data[j], app_data[i]];
        }
      }

      function setTimer(time_left = TIME_LEFT) {
        let timer_tag = document.createElement('div');
        app.append(timer_tag);
        timer = setInterval(() => {
          timer_tag.innerHTML = '<span>' + (--time_left) + '</span>';
          if (time_left <= 0) {
            clearInterval(timer);
            appRestart();
          }
        }, 1000);
      }

    });
  }

  function appRestart() {
    if (app.querySelector('button')) {
      return;
    }
    let button = document.createElement('button');
    button.textContent = 'Начать заново';
    app.append(button);
    button.addEventListener('click', () => {
      appInit();
    });
  }
}


