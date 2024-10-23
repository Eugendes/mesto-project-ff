(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"bc407e23-fae2-45b0-bf52-bcea2fc29144","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},n=function(e,t,n,r){var o=e.parentElement.querySelector(r);o&&(e.classList.remove(n),o.textContent="",o.classList.remove(t))},r=document.querySelector("#card-template").content,o=document.querySelector(".places__list");function a(e,t,n,o,a){var c=e.cardTitle,i=e.cardAlt,u=e.cardLink,l=e.cardLikeCounter,s=void 0===l?[]:l,d=e.cardId,p=e.ownerId,_=r.querySelector(".card").cloneNode(!0),f=_.querySelector(".card__like-button"),y=s.some((function(e){return e._id===a}));_.querySelector(".card__title").textContent=c,_.querySelector(".card__image").alt=i,_.querySelector(".card__image").src=u,_.querySelector(".card__like__counter").textContent=s.length,_.dataset.id=d,y&&f.classList.add("card__like-button_is-active");var m=_.querySelector(".card__delete-button");return p!==a?m.style.display="none":(m.style.display="block",m.addEventListener("click",t)),_.querySelector(".card__like-button").addEventListener("click",n),_.querySelector(".card__image").addEventListener("click",o),_}function c(e){o.prepend(e)}function i(n,r){var o=n.target.classList,a=n.target.closest(".card").querySelector(".card__like__counter"),c=o.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t).then((function(e){return console.log("Лайк убран:",e),e}))}(r):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t).then((function(e){return console.log("Лайк поставлен:",e),e}))}(r);c.then((function(e){var t=e.likes.length;o.contains("card__like-button_is-active")?o.remove("card__like-button_is-active"):o.add("card__like-button_is-active"),a.textContent=t})).catch((function(e){console.log("Ошибка: ".concat(e))}))}function u(n){var r=n.target.closest(".card"),o=r.dataset.id;r&&function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t).then((function(e){return console.log("Карточка удалена:",e),e}))}(o).then((function(){r.remove()})).catch((function(e){console.error("Ошибка: ".concat(e))}))}function l(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),0),document.addEventListener("keydown",d)}function s(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),500),document.removeEventListener("keydown",d)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector(".logo").src="0863e5bc26221680f1e2.svg",Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t).then((function(e){return console.log("Данные пользователя получены:",e),e})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t).then((function(e){return console.log("Данные карточек получены:",e),e}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],l=r[1],s=o._id,d=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),f=document.querySelector(".profile__image");d.textContent=o.name,_.textContent=o.about,f.style.backgroundImage="url('".concat(o.avatar,"')"),l.forEach((function(e){c(a({cardTitle:e.name,cardAlt:e.name,cardLink:e.link,cardLikeCounter:e.likes,cardId:e._id,ownerId:e.owner._id},u,(function(t){return i(t,e._id)}),g,s))}))})).catch((function(e){console.error("Ошибка:",e)}));var _={edit:document.querySelector(".popup_type_edit"),newCard:document.querySelector(".popup_type_new-card"),bigCard:document.querySelector(".popup_type_image"),newProfile:document.querySelector(".popup_type_avatar_edit")};document.querySelector(".profile__edit-button").addEventListener("click",(function(){return C(_.edit)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return C(_.newCard)})),document.querySelector(".profile__avatar-button").addEventListener("click",(function(){return C(_.newProfile)})),Object.values(_).forEach((function(e){e.querySelector(".popup__close").addEventListener("click",function(e){return function(){s(e)}}(e)),e.addEventListener("mousedown",function(e){return function(t){!function(e,t){e.target===t&&s(t)}(t,e)}}(e))}));var f=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),m=_.edit.querySelector(".popup__input_type_name"),v=_.edit.querySelector(".popup__input_type_description");_.edit.querySelector(".popup__form").addEventListener("submit",(function(n){n.preventDefault();var r=m.value,o=v.value,a=_.edit.querySelector(".popup__button");a.textContent="Сохранение...",a.disabled=!0,function(n){var r=n.name,o=n.about;return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t).then((function(e){return console.log("Данные обновлены:",e),e}))}({name:r,about:o}).then((function(e){f.textContent=e.name,y.textContent=e.about,s(_.edit)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){a.textContent="Сохранить",a.disabled=!1}))}));var b=_.newCard.querySelector(".popup__input_type_card-name"),h=_.newCard.querySelector(".popup__input_type_url");_.newCard.querySelector(".popup__form").addEventListener("submit",(function(n){n.preventDefault();var r,o,l,d=_.newCard.querySelector(".popup__button");d.textContent="Сохранение...",d.disabled=!0,(r={name:b.value,link:h.value},o=r.name,l=r.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:l})}).then(t).then((function(e){return console.log("Данные новой карточки получены:",e),e}))).then((function(e){c(a({cardTitle:e.name,cardAlt:e.name,cardLink:e.link,cardLikeCounter:e.likes,cardId:e._id,ownerId:e.owner._id},u,(function(t){return i(t,e._id)}),g,e.owner._id)),s(_.newCard)})).finally((function(){d.textContent="Сохранить",d.disabled=!1}))}));var S=document.querySelector(".popup__input_type_avatar"),q=document.querySelector(".profile__image");function C(e){l(e);var t={inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input-error",spanErrorClass:".popup__input_type_error",errorClass:"popup__error_visible"},r=e.querySelector(".popup__form");if(r&&!e.classList.contains("popup_type_image")&&function(e,t){var r=e.inputSelector,o=e.submitButtonSelector,a=e.inactiveButtonClass,c=e.inputErrorClass,i=e.spanErrorClass,u=e.errorClass,l=t.querySelectorAll(r),s=t.querySelector(o);l.forEach((function(e){n(e,u,c,i)})),s.classList.add(a),s.disabled=!0}(t,r),function(e,t){var r=e.inputSelector,o=e.submitButtonSelector,a=e.inactiveButtonClass,c=e.inputErrorClass,i=e.spanErrorClass,u=e.errorClass,l=t.querySelectorAll(r),s=t.querySelector(o);function d(){var e=!0;l.forEach((function(t){var r=t.dataset.errorMessage,o=t.parentElement.querySelector(i);t.checkValidity()?n(t,u,c,i):(t.classList.add(c),"url"===t.type?o.textContent=t.validationMessage:t.validity.patternMismatch?o.textContent=r:o.textContent=t.validationMessage,o.classList.add(u),e=!1)})),e?function(e,t){var n=t.inactiveButtonClass;e.classList.remove(n),e.disabled=!1}(s,{inactiveButtonClass:a}):function(e,t){var n=t.inactiveButtonClass;e.classList.add(n),e.disabled=!0}(s,{inactiveButtonClass:a})}s.classList.add(a),s.disabled=!0,l.forEach((function(e){e.addEventListener("input",d)}))}(t,r),e===_.edit){var o=document.querySelector(".profile__title"),a=document.querySelector(".profile__description"),c=e.querySelector(".popup__input_type_name"),i=e.querySelector(".popup__input_type_description");c.value=o.textContent,i.value=a.textContent}if(e===_.newCard){var u=e.querySelector(".popup__input_type_card-name"),s=e.querySelector(".popup__input_type_url"),d=_.newCard.querySelector(".popup__button");u.value="",s.value="",d.disabled=!1}if(e===_.newProfile){var p=e.querySelector(".popup__input_type_avatar"),f=_.newProfile.querySelector(".popup__button");p.value="",f.disabled=!1}}function g(e){var t=e.target,n=t.src,r=t.alt;_.bigCard.querySelector(".popup__image").src=n,_.bigCard.querySelector(".popup__image").alt=r,_.bigCard.querySelector(".popup__caption").textContent=r,l(_.bigCard)}_.newProfile.querySelector(".popup__form").addEventListener("submit",(function(n){n.preventDefault();var r,o=S.value,a=_.newProfile.querySelector(".popup__button");a.textContent="Сохранение...",a.disabled=!0,(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t).then((function(e){return console.log("Данные обновлены:",e),e}))).then((function(e){q.style.backgroundImage="url('".concat(e.avatar,"')"),s(_.newProfile)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){a.textContent="Сохранить",a.disabled=!1}))})),document.querySelector(".places__list"),_.bigCard})();