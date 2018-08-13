var divData = document.getElementById("data"), divAmbient = document.getElementById("ambient");

function sortDecreasingVetDuplex(vet){
	var numMax=0, idMax=0, temp, vetID = new Array();
	for(var i=0;i<vet.length;i++){
		vetID[i] = i;
	}
	for(var i=0;i<vet.length;i++){
		for(var j=i+1;j<vet.length;j++){
			if(vet[i]<vet[j]){
				temp = vet[i];
				vet[i]=vet[j];
				vet[j]=temp;
				
				temp = vetID[i];
				vetID[i]=vetID[j];
				vetID[j]=temp;
			}
		}
	}
	return vetID;
}

var AI_World = function(numFlowers){
	this.currentTemperature=parseInt(Math.random()*100)%75;
	this.currentWater=parseInt(Math.random()*100)%75;
	this.currentSunlight=parseInt(Math.random()*100)%75;
	this.currentNutrient=parseInt(Math.random()*100)%75;
	this.currentbeneficialairinsect=parseInt(Math.random()*100)%75;
	this.currentbeneficialearthinsect=parseInt(Math.random()*100)%75;
	
	this.temperature=new Array();
	this.water=new Array();
	this.sunlight=new Array();
	this.nutrient=new Array();
	this.beneficialairinsect=new Array();
	this.beneficialearthinsect=new Array();
	
	var _kmaxFlowers = numFlowers;
	var _geracao=0, _mutacao = 0;
	
	for(var i=0;i<_kmaxFlowers;i++){
		this.temperature[i]=parseInt(Math.random()*100)%75;
		this.water[i]=parseInt(Math.random()*100)%75;
		this.sunlight[i]=parseInt(Math.random()*100)%75;
		this.nutrient[i]=parseInt(Math.random()*100)%56;
		this.beneficialairinsect[i]=parseInt(Math.random()*100)%75;
		this.beneficialearthinsect[i]=parseInt(Math.random()*100)%75;
	}
	
	this.Fitness = function(idFlower){
		var numFitness=0;
		numFitness = Math.abs(this.temperature[idFlower]-this.currentTemperature);
		numFitness += Math.abs(this.water[idFlower]-this.currentWater);
		numFitness += Math.abs(this.sunlight[idFlower]-this.currentSunlight);
		numFitness += Math.abs(this.nutrient[idFlower]-this.currentNutrient);
		numFitness += Math.abs(this.beneficialairinsect[idFlower]-this.currentbeneficialairinsect);
		numFitness += Math.abs(this.beneficialearthinsect[idFlower]-this.currentbeneficialearthinsect);
		
		return numFitness;
	}
	this.Evolve = function(){
		_geracao++;
		var fitTemperature= new Array();
		var fitWater= new Array();
		var fitSunlight= new Array();
		var fitNutrient= new Array();
		var fitbeneficialairinsect= new Array();
		var fitbeneficialearthinsect= new Array();
		var fitness= new Array();
		var i, leastFit = 0, leastFitIndex;
		
		var fitvalues = new Array();// vetor com aproximacoes
		for (i=0;i<_kmaxFlowers;i++){
			fitvalues[fitvalues.length]=this.Fitness(i);
		}
		fitvalues=sortDecreasingVetDuplex(fitvalues);
		//alert("fitvalues: "+fitvalues);
		// remocao/alteracao dos piores especime
		for(var i=0;i<parseInt(_kmaxFlowers/2.0);i++){
			//alert( parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) );
			//alert( fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ] );
			this.temperature[fitvalues[i]]=this.temperature[fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ]];
			this.water[fitvalues[i]]=this.water[fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ]];
			this.sunlight[fitvalues[i]]=this.sunlight[fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ]];
			this.nutrient[fitvalues[i]]=this.nutrient[fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ]];
			this.beneficialairinsect[fitvalues[i]]=this.beneficialairinsect[fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ]];
			this.beneficialearthinsect[fitvalues[i]]=this.beneficialearthinsect[fitvalues[ parseInt((_kmaxFlowers/2.0)+((Math.random()*100)%_kmaxFlowers/2.0)) ]];
		}

		// selecao dos genes aleatoriamente
		for(var i=0;i<_kmaxFlowers;i++){
			fitTemperature[i]=this.temperature[parseInt(((Math.random()*100)%_kmaxFlowers)-1)];
			fitWater[i]=this.water[parseInt(((Math.random()*100)%_kmaxFlowers)-1)];
			fitSunlight[i]=this.sunlight[parseInt(((Math.random()*100)%_kmaxFlowers)-1)];
			fitNutrient[i]=this.nutrient[parseInt(((Math.random()*100)%_kmaxFlowers)-1)];
			fitbeneficialairinsect[i]=this.beneficialairinsect[parseInt(((Math.random()*100)%_kmaxFlowers)-1)];
			fitbeneficialearthinsect[i]=this.beneficialearthinsect[parseInt(((Math.random()*100)%_kmaxFlowers)-1)];
		}
		// nova geracao
		for(var i=0;i<_kmaxFlowers;i++){
			this.temperature[i]=fitTemperature[i];
			this.water[i]=fitWater[i];
			this.sunlight[i]=fitSunlight[i];
			this.nutrient[i]=fitNutrient[i];
			this.beneficialairinsect[i]=fitbeneficialairinsect[i];
			this.beneficialearthinsect[i]=fitbeneficialearthinsect[i];
		}
		// mutacao
		for(var i=0;i<_kmaxFlowers;i++){
			if(parseInt(Math.random()*100)==1){
				this.temperature[i]=(parseInt(Math.random()*100))%75;
				_mutacao++;
			}
			if(parseInt(Math.random()*100)==1){
				this.water[i]=(parseInt(Math.random()*100))%75;
				_mutacao++;
			}
			if(parseInt(Math.random()*100)==1){
				this.sunlight[i]=(parseInt(Math.random()*100))%75;
				_mutacao++;
			}
			if(parseInt(Math.random()*100)==1){
				this.nutrient[i]=(parseInt(Math.random()*100))%56;
				_mutacao++;
			}
			if(parseInt(Math.random()*100)==1){
				this.beneficialairinsect[i]=(parseInt(Math.random()*100))%75;
				_mutacao++;
			}
			if(parseInt(Math.random()*100)==1){
				this.beneficialearthinsect[i]=(parseInt(Math.random()*100))%75;
				_mutacao++;
			}
		}
		
		// debug
		divData.innerHTML = ai.debug();
		divAmbient.innerHTML = ai.debugAmbient();
	}
	
	this.debug = function(){
		var texto = new String();
		for(var i=0;i<_kmaxFlowers;i++){
			texto+="</br>ID: "+i;
			texto+=("</br> temperature: "+this.temperature[i]);
			texto+=("</br> water: "+this.water[i]);
			texto+=("</br> sunlight: "+this.sunlight[i]);
			texto+=("</br> nutrient: "+this.nutrient[i]);
			texto+=("</br> beneficialairinsect: "+this.beneficialairinsect[i]);
			texto+=("</br> beneficialearthinsect: "+this.beneficialearthinsect[i]);
			texto+=("</br> Fitness: "+this.Fitness(i));
			texto+=("</br> ");
		}
		return texto;
	}				
	this.debugAmbient = function(){
		var texto="Ambiente:";
		texto+=("</br> Geracao: "+_geracao);
		texto+=("</br> Mutacao: "+_mutacao);
		texto+=("</br> temperature: "+this.currentTemperature);
		texto+=("</br> water: "+this.currentWater);
		texto+=("</br> sunlight: "+this.currentSunlight);
		texto+=("</br> nutrient: "+this.currentNutrient);
		texto+=("</br> beneficialairinsect: "+this.currentbeneficialairinsect);
		texto+=("</br> beneficialearthinsect: "+this.currentbeneficialearthinsect);
		texto+=("</br> ");
		return texto;
	}
	
	this.getNumFlowers = function(){
		return _kmaxFlowers;
	}
}
var ai = new AI_World(10);
divData.innerHTML = ai.debug();
divAmbient.innerHTML = ai.debugAmbient();
function atualizar(num){
	for(var i=0;i<num;i++)
		ai.Evolve();
}