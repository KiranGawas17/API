
    $(document).ready(function(){
     
  var countries=['India','Nepal','Brazil','Australia','Italy','England','America']

  $.each(countries, function (i, data) {
     $('#countrylist').append($('<option></option>').val(data).html(data));
   });

$('#countrylist').select2();
        // $.ajax({
        //     url:'https://datahub.io/core/country-list/r/0.html',
        //     type:'GET',
        //     success:function(result){
        //         console.log(result);
        //     },
        //    error:function(error)
        //    {
        //        alert("error");
        //    }  
        // })
    $('#search').on('click',function(){
        var URL='';
      if($('#all').prop('checked')){
          URL='https://coronavirus-19-api.herokuapp.com/all'
      }
      else{
     var country= $( "#countrylist option:selected" ).val();
          URL=`https://coronavirus-19-api.herokuapp.com/countries/${country}`
         
      }

      console.log(URL);

       $.ajax({
            url:URL,
            type:'GET',
            success:function(result){
                console.log(result);
                if($('#all').prop('checked')){
                    $('#singlecountry').hide();
                    $('#allbox').show();
                    $('#cases').text((result.cases).toLocaleString());
                    $('#deaths').text((result.deaths).toLocaleString());
                    $('#recv').text((result.recovered).toLocaleString());
                }
                else{
                    $('#allbox').hide();
                    $("#cnty > tbody").empty();
                    $('#singlecountry').show();
                    var rw=`<tr><td>${result.country}</td><td>${(result.cases).toLocaleString()}</td><td>${(result.todayCases).toLocaleString()}</td><td>${(result.deaths).toLocaleString()}</td>
                    <td>${(result.todayDeaths).toLocaleString()}</td><td>${(result.recovered).toLocaleString()}</td><td>${(result.active).toLocaleString()}</td><td>${(result.critical).toLocaleString()}</td><td>${(result.casesPerOneMillion).toLocaleString()}</td>
                    <td>${(result.deathsPerOneMillion).toLocaleString()}</td><td>${(result.totalTests).toLocaleString()}</td><td>${(result.testsPerOneMillion).toLocaleString()}</td></tr>`
                    $('#cnty > tbody').append(rw);
                }

            },
           error:function(error)
           {
               alert("error");
           }  
        })
    });    

    });
