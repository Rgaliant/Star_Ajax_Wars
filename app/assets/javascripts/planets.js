var currentPlanet = {};
var showForm = false;
var editingPlanet

$(document).ready( function() {

  function getPlanet(id) {
    $.ajax({
      url: '/planets/' + id,
      method: 'GET'
    }).done( function(planet) {
      if (editingPlanet) {
        var li = $("[data-id='" + id + "'")
        $(li).replaceWith(planet)
        editingPlanet = null
      } else {
      $('#planets-list').append(planet);
      }
    });
  }

  function toggle() {
    showForm = !showForm;
    $('#planet-form').remove()
    $('#planets-list').toggle()
    
    if (showForm) {
        $.ajax({
          url: '/planet_form',
          method: 'GET',
          data: { id: editingPlanet }
        }).done( function(html) {
          $('#toggle').after(html);
        });
      }
    }

    $(document).on('click', '#edit-planet', function() {
      editingPlanet = $(this).siblings('.planet-item').data().id
      toggle();
    });


  $(document).on('submit', '#planet-form form', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var url = '/planets';
    var method = 'POST'
    if (editingPlanet) {
    url = url + '/' + editingPlanet;
    method = 'PUT'
  }
    $.ajax({
      url: url,
      type: method,
      dataType: 'JSON',
      data: data
    }).done( function(planet) {
      toggle()
      getPlanet(planet.id)
      var g = '<li class="planet-item" data-id="' + planet.id + '" data-name="' + planet.name + '">' + planet.name + '-' + planet.description + '</li>';
      $('#planets-list').append(g);
    }).fail( function(err) {
      alert(err.responseJSON.errors)
    });
  });


  $('.planet-item').on('click', function() {
    currentPlanet.id = this.dataset.id;
    currentPlanet.name = this.dataset.name;
    $.ajax({
      url: '/planets/' + currentPlanet.id + '/citizens',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(citizens) {
      $('#planet').text('Citizens on ' + currentPlanet.name);
      var list = $('#citizens');
      list.empty();
      citizens.forEach( function(cit) {
        var li = '<li class="list-group-item" data-citizen-id="' + cit.id + '">' + cit.name + '-' + cit.specie + '</li>'
        list.append(li)
      });
    });
  });

  $('#toggle').on('click', function() {
    toggle()
  });

});