(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"bc407e23-fae2-45b0-bf52-bcea2fc29144","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},n=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t).then((function(e){return console.log("Данные пользователя получены:",e),e})).catch((function(e){console.error("Ошибка при загрузке данных пользователя:",e)}))},r=document.querySelector("#card-template").content,o=document.querySelector(".places__list");function c(e,t,n,o,c){var a=e.cardTitle,u=e.cardAlt,i=e.cardLink,l=e.cardLikeCounter,s=void 0===l?[]:l,d=e.cardId,p=e.ownerId,_=r.querySelector(".card").cloneNode(!0),f=_.querySelector(".card__like-button"),y=s.some((function(e){return e._id===c}));_.querySelector(".card__title").textContent=a,_.querySelector(".card__image").alt=u,_.querySelector(".card__image").src=i,_.querySelector(".card__like__counter").textContent=s.length,_.dataset.id=d,y&&f.classList.add("card__like-button_is-active");var m=_.querySelector(".card__delete-button");return p!==c?m.style.display="none":(m.style.display="block",m.addEventListener("click",t)),_.querySelector(".card__like-button").addEventListener("click",n),_.querySelector(".card__image").addEventListener("click",o),_}function a(e){o.prepend(e)}function u(n,r){var o=n.target.classList,c=n.target.closest(".card").querySelector(".card__like__counter"),a=parseInt(c.textContent,10);o.contains("card__like-button_is-active")?(o.remove("card__like-button_is-active"),function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t).then((function(e){return console.log("Лайк убран:",e),e})).catch((function(e){console.error("Ошибка при отмене лайка карточки:",e)}))}(r).then((function(){a-=1,c.textContent=a}))):(o.add("card__like-button_is-active"),function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t).then((function(e){return console.log("Лайк поставлен:",e),e})).catch((function(e){console.error("Ошибка при лайке карточки:",e)}))}(r).then((function(){a+=1,c.textContent=a})))}function i(n){var r=n.target.closest(".card"),o=r.dataset.id;r&&(function(n){fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t).then((function(e){return console.log("Карточка удалена:",e),e})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}(o),r.remove())}function l(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),0),document.addEventListener("keydown",d)}function s(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),500),document.removeEventListener("keydown",d)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector(".logo").src="0863e5bc26221680f1e2.svg",Promise.all([n(),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t).then((function(e){return console.log("Данные карточек получены:",e),e})).catch((function(e){console.error("Ошибка при загрузке данных карточек:",e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],l=r[1],s=o._id,d=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),f=document.querySelector(".profile__image");d.textContent=o.name,_.textContent=o.about,f.style.backgroundImage="url('".concat(o.avatar,"')"),l.forEach((function(e){a(c({cardTitle:e.name,cardAlt:e.name,cardLink:e.link,cardLikeCounter:e.likes,cardId:e._id,ownerId:e.owner._id},i,(function(t){return u(t,e._id)}),g,s))}))})).catch((function(e){console.error("Ошибка:",e)}));var _={edit:document.querySelector(".popup_type_edit"),newCard:document.querySelector(".popup_type_new-card"),bigCard:document.querySelector(".popup_type_image"),newProfile:document.querySelector(".popup_type_avatar_edit")};document.querySelector(".profile__edit-button").addEventListener("click",(function(){return C(_.edit)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return C(_.newCard)})),document.querySelector(".profile__avatar-button").addEventListener("click",(function(){return C(_.newProfile)})),Object.values(_).forEach((function(e){e.querySelector(".popup__close").addEventListener("click",function(e){return function(){s(e)}}(e)),e.addEventListener("mousedown",function(e){return function(t){!function(e,t){e.target===t&&s(t)}(t,e)}}(e))}));var f=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),m=_.edit.querySelector(".popup__input_type_name"),v=_.edit.querySelector(".popup__input_type_description");_.edit.querySelector(".popup__form").addEventListener("submit",(function(n){n.preventDefault();var r=m.value,o=v.value;f.textContent=r,y.textContent=o;var c=_.edit.querySelector(".popup__button");c.textContent="Сохранение...",c.disabled=!0,function(n){var r=n.name,o=n.about;return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t).then((function(e){return console.log("Данные обновлены:",e),e})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)}))}({name:r,about:o}).then((function(){s(_.edit)})).finally((function(){c.textContent="Сохранить",c.disabled=!1}))}));var b=_.newCard.querySelector(".popup__input_type_card-name"),h=_.newCard.querySelector(".popup__input_type_url");_.newCard.querySelector(".popup__form").addEventListener("submit",(function(n){n.preventDefault();var r,o,l,d=_.newCard.querySelector(".popup__button");(d.textContent="Сохранение...",d.disabled=!0,b.value&&h.value)&&(b.value,b.value,h.value,(r={name:b.value,link:h.value},o=r.name,l=r.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:l})}).then(t).then((function(e){return console.log("Данные новой карточки получены:",e),e})).catch((function(e){console.error("Ошибка при загрузке новой карточки:",e)}))).then((function(e){a(c({cardTitle:e.name,cardAlt:e.name,cardLink:e.link,cardLikeCounter:e.likes,cardId:e._id,ownerId:e.owner._id},i,(function(t){return u(t,e._id)}),g,e.owner._id)),s(_.newCard)})).finally((function(){d.textContent="Сохранить",d.disabled=!1})))}));var S=document.querySelector(".popup__input_type_avatar"),q=document.querySelector(".profile__image");function C(e){l(e);var t=e.querySelector(".popup__form");if(t&&!e.classList.contains("popup_type_image")&&function(e,t){var n=t.submitButtonSelector,r=t.inactiveButtonClass,o=e.querySelectorAll(".popup__input"),c=e.querySelector(n);o.forEach((function(e){var t=e.parentElement.querySelector(".popup__input_type_error");t&&(e.classList.remove("popup__input-error"),t.textContent="",t.classList.remove("popup__error_visible"))})),c.classList.add(r),c.disabled=!1}(t,{submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled"}),function(e,t){var n=e.inputSelector,r=e.submitButtonSelector,o=e.inactiveButtonClass,c=e.errorClass,a=t.querySelectorAll(n),u=t.querySelector(r);function i(){var e=!0;a.forEach((function(t){var n=t.parentElement.querySelector(".popup__input_type_error"),r=t.value.length;t.value.trim()?r<2||r>40?(t.classList.add("popup__input-error"),n.textContent=t.validationMessage,n.classList.add(c),e=!1):"url"!==t.type||/^(https?:\/\/[^\s]+)$/.test(t.value.trim())?/^[a-zA-Zа-яА-ЯёЁ\- ]+$/.test(t.value.trim())||"url"===t.type?(t.classList.remove("popup__input-error"),n.textContent="",n.classList.remove(c)):(t.classList.add("popup__input-error"),n.textContent="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",n.classList.add(c),e=!1):(t.classList.add("popup__input-error"),n.textContent=t.validationMessage,n.classList.add(c),e=!1):(t.classList.add("popup__input-error"),n.textContent=t.validationMessage,n.classList.add(c),e=!1)})),e?(u.classList.remove(o),u.disabled=!1):(u.classList.add(o),u.disabled=!0)}u.classList.remove(o),u.disabled=!1,a.forEach((function(e){e.addEventListener("input",i)}))}({inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",errorClass:"popup__error_visible"},t),e===_.edit){var n=document.querySelector(".profile__title"),r=document.querySelector(".profile__description"),o=e.querySelector(".popup__input_type_name"),c=e.querySelector(".popup__input_type_description");o.value=n.textContent,c.value=r.textContent}if(e===_.newCard){var a=e.querySelector(".popup__input_type_card-name"),u=e.querySelector(".popup__input_type_url"),i=_.newCard.querySelector(".popup__button");a.value="",u.value="",i.classList.add("popup__button_disabled"),i.disabled=!1}if(e===_.newProfile){var s=e.querySelector(".popup__input_type_avatar"),d=_.newProfile.querySelector(".popup__button");s.value="",d.classList.add("popup__button_disabled"),d.disabled=!1}}function g(e){var t=e.target,n=t.src,r=t.alt;_.bigCard.querySelector(".popup__image").src=n,_.bigCard.querySelector(".popup__image").alt=r,_.bigCard.querySelector(".popup__caption").textContent=r,l(_.bigCard)}_.newProfile.querySelector(".popup__fhttps://github.com/Eugendes/mesto-project-ff/actionsorm").addEventListener("submit",(function(n){n.preventDefault();var r,o=S.value,c=_.newProfile.querySelector(".popup__button");c.textContent="Сохранение...",c.disabled=!0,q.style.backgroundImage="url('".concat(o,"')"),(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t).then((function(e){return console.log("Данные обновлены:",e),e})).catch((function(e){console.error("Ошибка при обновлении аватарки профиля:",e)}))).then((function(){s(_.newProfile)})).finally((function(){c.textContent="Сохранить",c.disabled=!1}))})),document.querySelector(".places__list"),_.bigCard,document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".profile__title"),t=document.querySelector(".profile__description"),r=document.querySelector(".profile__image");n().then((function(n){var o=n.name,c=n.about,a=n.avatar;e.textContent=o,t.textContent=c,r.style.backgroundImage="url('".concat(a,"')")})).catch((function(e){console.error("Ошибка загрузки данных пользователя:",e)}))}))})();