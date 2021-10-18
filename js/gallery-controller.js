'use strict'

function onShowModal(projId) {
    var $elModal = $('.modal-body');
    console.log('$elModal', $elModal);
    var elProj = getProjById(projId);
    // console.log('elProj', elProj);
    $('.modal-body h2').text(elProj.name)
    $('.modal-body .proj-title').text(elProj.title)
    var strHtml = `<img class="img-fluid d-block mx-auto" src="img/portfolio/02-full.jpg" alt="${elProj.name}">`;
    $('.modal-body .proj-img').html(strHtml);
    $('.modal-body .proj-desc').text(elProj.desc);
    $('.modal-body .proj-published-at').text(elProj.publishedAt);
    $('.modal-body .category').text(elProj.labels);
    var strHtml = ` <a href="${elProj.url}" target="_blank">show-proj</a>`
    $('.show-proj').html(strHtml)
}

function renderProjs() {
    var projs = getProjs();
    var strHtmls = projs.map(proj => {
        return `<div class="col-md-4 col-sm-6 item" onclick="onShowModal('${proj.id}')">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="${proj.name}">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
    });
    $('.portfolio-container').html(strHtmls)
}