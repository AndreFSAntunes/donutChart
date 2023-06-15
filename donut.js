window.onload = function () {
    carregarGrafico(58, 115);
};

function carregarGrafico(atendidas, total) {
    let ctx = document.getElementById('graficoDonut').getContext('2d');

    let progresso = 0;
    const progressoFinal = (100 * atendidas) / total;
    const duracao = 1000;
    const increment = progressoFinal / (duracao / 10);
    const corAtendidos = '#00a1ff';
    const corNaoAtendidos = '#ccc';

    let dados = {
        datasets: [{
            data: [progresso, 100 - progresso],
            backgroundColor: [corAtendidos, corNaoAtendidos],
            hoverBackgroundColor: [corAtendidos, corNaoAtendidos]
        }]
    };

    const options = {
        cutoutPercentage: 80,
        animation: {
            duration: 0
        },
        legend: {
            display: false
        },
        responsive: false,
        maintainAspectRatio: false
    };

    let graficoDonut = new Chart(ctx, {
        type: 'doughnut',
        data: dados,
        options: options
    });

    const animacaoProgresso = function () {
        if (progresso < progressoFinal) {
            progresso += increment;
            graficoDonut.data.datasets[0].data[0] = progresso;
            graficoDonut.data.datasets[0].data[1] = 100 - progresso;
            graficoDonut.update();
            setTimeout(animacaoProgresso, 10);
        } else {
            graficoDonut.data.datasets[0].data[0] = atendidas;
            graficoDonut.data.datasets[0].data[1] = total - atendidas;
            graficoDonut.update();
        }

    }

    setTimeout(animacaoProgresso, 10);
}
