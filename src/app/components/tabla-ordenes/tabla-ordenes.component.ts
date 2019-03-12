import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-tabla-ordenes',
  templateUrl: './tabla-ordenes.component.html',
  styleUrls: ['./tabla-ordenes.component.css']
})
export class TablaOrdenesComponent implements OnInit {

  constructor() { }
 	
  ngOnInit() {
		 $("#numeracion").keyup(
		 		function(){
					 //alert(numeracion);
					var numeracion = String($("#numeracion").val());
					//var filter = numeracion.value.toUpperCase();
					var tr = $('#tablaOrdenes tbody').children('tr');
					 
					   // Loop through all table rows, and hide those who don't match the search query
				 var i = 0;
				 for (i = 0; i < tr.length; i++) {
						var td = tr[i].getElementsByTagName("td")[1];
						if (td) {
							var txtValue = td.textContent || td.innerText;
							if (txtValue.indexOf(numeracion) > -1) {
								tr[i].style.display = "";
							} else {
								tr[i].style.display = "none";
							}
						} 
				 }
		 });
		 
		 
		  /*var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}*/
	}
		 
		/*  $(".search").keyup(function () {
    //var searchTerm = $(".search").val();
		var searchTerm = "id1";
    var listItem = $('.results tbody').children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
    
  $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });
    
  $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
    $(this).attr('visible','false');
  });

  $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
    $(this).attr('visible','true');
  });

  var jobCount = $('.results tbody tr[visible="true"]').length;
    $('.counter').text(jobCount + ' item');

  if(jobCount == '0') {$('.no-result').show();}
    else {$('.no-result').hide();}
		  });
  }*/
	 
	 
}
 

  


