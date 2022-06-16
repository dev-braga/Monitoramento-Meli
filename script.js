
$('#logo').attr('draggable', false);

$('#send').click(async function () {
    var teste = $('#teste').val();
    $('#conteudo').html(teste);
    var json = [{}]
    var rotas = $('.monitoring-row__bold');
    var rota3 = []
    var rotasarray = []
    var regiaoarray2 = []
    
        rotas.each(function(n,item) {
            rota = item.innerText.split("|")
            if (rota[1] == undefined) {
                rota3 = item.innerText.split("#")
            }else{
                console.log(rota)
                rota3 = rota[1].split("#")
            }
            rotasarray.push(rota3[1])
            rota2 = item.innerText.split("|")
            rota4 = rota2[0].split(" ")
            regiaoarray2.push(rota4[0])
        })

    var placas = [];
    $('.monitoring-row-details > .andes-tooltip__trigger > .monitoring-row-details__license').each(function(n, item) {
        placas.push(item.innerText);
    })

    drivers = []

    function titleize(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1);

        words[a] = w;
    }

    return words.join(" ");
    }
    var driver = ''
    $('.monitoring-row-details__driver-name').each(function(n, item) {
        driver = titleize(item.innerText)
        drivers.push(driver);
    })

    var progresso = [];
    $('.monitoring-row-details__name').each(function(n, item) {
        progresso.push(item.innerText);
    })
    
    var total = [];
    var entreges = [];
    var insucessos = [];
    var pendentes = [];
    $('.monitoring-row-shipments__data').each(function(n, item) {
          $(item).find('strong').each( function(n2, item2) {
            if (n2 == 0) {
                entreges.push(item2.innerText);
                entrege = parseInt(item2.innerText)
            }
            if (n2 == 1) {
                insucessos.push(item2.innerText);
                insucesso = parseInt(item2.innerText)
            }
            if (n2 == 2) {
                pendentes.push(item2.innerText);
                pendente = parseInt(item2.innerText)
            }
             
          })
          total1 = entrege + insucesso + pendente
          total.push(total1)
    })
    var percent = []
    $('.sc-progress-wheel__percentage>p').each(function(n, item) {
        percent.push(item.innerText)
    })

    function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
    }

    function dataAtualFormatada2(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"-"+mesF+"-"+anoF;
    }
        var regiao = [];
        var nome = '';
    $('.andes-list__item--selected .list-row__text').each(function(n, item) {
        nome = item.innerText
        var regiao1 = item.innerText.split("|")
	regiao = regiao1[0].split(" ")
        regiao = regiao[0]
    })

    kmtotal = [];
    $('.monitoring-row-details__untracked').each(function(n, item){
        string = item.innerHTML.split(' ');
        kmtotal.push(string[2])
    })

    var table = []
    $('.monitoring-row').each(function (n , item) {
        table.push(
            {
                Região: regiao,
                Data: dataAtualFormatada(),
                Placa: placas[n],
                Rota: parseInt(rotasarray[n]),
                Motorista: drivers[n],
                Transportadora: $('#tp').val(),
                Status: progresso[n],
                Pacotes: parseInt(total[n]),
                Entreges: parseInt(entreges[n]),
                Insucessos: parseInt(insucessos[n]),
                Progresso: parseInt(percent[n]) / 100,
                'ID Regiao': regiaoarray2[n],
                KmFinal: parseFloat(kmtotal[n]),
		Tempo: $("#time").val()
            }
        )
    })
    var data3 = dataAtualFormatada2()
	var sql = await alasql('SELECT * INTO XLSX("'+nome+'-'+data3+'_'+$('#tp').val()+'.xlsx", {headers: true}) FROM ?', [table]);
	location.reload();
});
