	var data;

	var electorialArray = [];
	var firstNames = [];
	var lastNames = [];
	var electorateNames = [];
	var parliamentaryTitles = [];
	var positionOnMarriage = [];
	var positionIn2012Vote = [];
	var politicalParty = [];
	var state = [];
	
    d3.csv('postcodesNew.csv', function(data) {
		
		$('#enterBox').on('click', function(){
			$('#annotationBox').empty()
			$('#mpDetails').empty()
			electorialArray = [];
			firstNames = [];
			lastNames = [];
			electorateNames = [];
			parliamentaryTitles = [];
			positionOnMarriage = [];
			positionIn2012Vote = [];
			politicalParty = [];
			state = [];
			
			yourPostCode = $('input').val();
			
			data.forEach(function(obj) {
				if (obj.postcode == yourPostCode) {
					electorialArray.push(obj.electoralDivision)
				}
			})
			
			if (electorialArray.length <= 0) {
				$('#annotationBox').html('<h4 class="makeLarge">Please enter a valid postcode</h4>')
			} else {
				d3.csv('electorates.csv', function(data) {

									data.forEach(function(obj) {
										for (i = 0; i< electorialArray.length ; i++) {
											if (obj.electorate == electorialArray[i]) {
												firstNames.push(obj.firstName);
												lastNames.push(obj.surname);
												electorateNames.push(obj.electorate);
												parliamentaryTitles.push(obj.parliamentaryTitles);
												positionOnMarriage.push(obj.positionOnMarriage);
												positionIn2012Vote.push(obj.positionIn2012Vote);
												politicalParty.push(obj.politicalParty);
												state.push(obj.state);
											}
										}
									})

									var index = lastNames.indexOf("O'Connor");
									if (index !== -1) {
										lastNames[index] = "O\'Connor";

									}
		
									function placeMpDetails(idSelector){
										$('#mpDetails').empty()
										$('#mpDetails').append('<img class="shadowBox" src="bg-horizontal-top.png"></img>')
										$('#mpDetails').append( '<h4><span class="makeLarge">Member - <span class="answers">'  + firstNames[idSelector] + ' ' + lastNames[idSelector] + ', ' + politicalParty[idSelector] + '</span></span></h4>')
										$('#mpDetails').append( '<h4><span class="makeLarge">Electorate - <span class="answers">' + electorateNames[idSelector] + ', ' + state[idSelector] + '</span></span></h4>')
										$('#mpDetails').append( '<h4><span class="makeHuge">Position on same sex marriage - <span class="marriageAnswers">' + positionOnMarriage[idSelector] + '</span></span></h4>')
										$('#mpDetails').append( '<h4><span class="makeHuge">Position in 2012 vote - <span class="marriageAnswers">' + positionIn2012Vote[idSelector] + '</span></span></h4><br>')
										$('#mpDetails').append( '<p>Notes - the 2012 vote was a private member\'s bill. Details of postcodes from the Australian Bureau of Statistics (get <a href="postcodes.csv" target="_blank">CSV</a>) and electorates data from the <a href ="http://www.aph.gov.au/About_Parliament/Parliamentary_Departments/Parliamentary_Library/pubs/BN/1011/Postcodes2009Boundaries" target="_blank">Parliament of Australia</a> (get <a href="electorates.csv" target="_blank">CSV</a>).</p>')
									}
									

									if(electorateNames.length > 1){										
										var electorateDisplay = 'Choose your electorate'
										var spacer = ' | '
										$('.annotation-wrap').prepend('<img class="shadowBox" src="bg-horizontal-bottom.png"></img>')
										
										$('#annotationBox').append('<h3><span class="makeLarge">' + electorateDisplay + ':</span></h3>')
										
										for (x = 0; x < firstNames.length; x++){
											if (firstNames.length - 1 == x){
												spacer = ''
												console.log(1)
											}
											$('#annotationBox').append('<h3>' + electorateNames[x] + '</h3>' + spacer)
											$('#annotationBox h3:last-child').attr('class','electoralLabel').attr('id', x)
										}		
										
									} else {
										//$('#annotationBox').append('<h3><span class="makeLarge">Electorate: ' + electorateNames[0] + '</span></h3>')
										placeMpDetails(0)
										
									}		
									
									$('.electoralLabel').on('click',function(){
										if(electorateNames.length > 1){
											idSelector = this.id;
											placeMpDetails(idSelector)	
										} 
									})

				})
			}
		})								
							
	})
