

      url = URL // Constant URL must be set in file js/config.js. Catalog menu must be represented in json format and provided for requests from the frontend at this url.

      const renderMenu = (catalogMenuObj, innerSpan) => {
        const catalogMenu = document.querySelector('.catalog-menu');
        catalogMenu.innerHTML = '';

        catalogMenuObj.forEach(el => {
          var li = document.createElement("li");
          li.innerHTML = el.title

         
          catalogMenu.appendChild(li);
        });
        var span = document.createElement("span");
        span.innerHTML = innerSpan
        catalogMenu.appendChild(span);
      }

      const spanClickHandler = (menuList, menusArray = [menuList]) => {
        return function() { 
          menusArray.splice(-1,1)
          if ((menusArray.length - 2) !== -1) {
            renderMenu(menusArray[menusArray.length - 1], "Вернуться назад")
            addEvents(menusArray[menusArray.length - 1], menusArray)
          }
          if ((menusArray.length - 2) === -1) {
            renderMenu(menusArray[menusArray.length - 1], "")
            addEvents(menusArray[menusArray.length - 1], menusArray)
          }
        };
      }

      const addEvents = (menuList, menusArray = [menuList]) => {
        const spanClickHandlerNotAnon = spanClickHandler(menuList, menusArray)


        menuList.forEach((el, index) => {
          const catalogMenu = document.querySelector('.catalog-menu')

          if (el.hasOwnProperty('children')) {

            const domEl = catalogMenu.querySelector(`li:nth-child(${index+1})`)
            domEl.addEventListener('click', () => {
              renderMenu(el.children, "Вернуться назад")
              menusArray.push(el.children)
              addEvents(el.children, menusArray)
            })
            const span = catalogMenu.querySelector(`span`)
            span.removeEventListener('click', spanClickHandlerNotAnon)
            span.addEventListener('click', spanClickHandlerNotAnon)

            
          } else {
            const span = catalogMenu.querySelector(`span`)
            span.removeEventListener('click', spanClickHandlerNotAnon)
            span.addEventListener('click', spanClickHandlerNotAnon)
          }
        })
      }


      async function getMenu(url, data = {}) {
        let res = await (await fetch(url)).json();

        renderMenu(res, '')


        addEvents(res)
      };
      getMenu(url);