window.onload = function () {
    carregarGrafico(70, 100);
};

function carregarGrafico(atendidas, total) {
    const ctx = document.getElementById('graficoDonut').getContext('2d');
    const corAtendidos = '#00a1ff';
    const corNaoAtendidos = '#ccc';
    let progresso = 0;
    const progressoFinal = (100 * atendidas) / total;
    const increment = progressoFinal / (1000 / 10); // duration: 1000

    const options = {
        cutoutPercentage: 80,
        animation: { duration: 0 },
        legend: { display: false },
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            beforeDraw: function (chart) {
                const width = chart.chart.width;
                const height = chart.chart.height;
                const ctx = chart.chart.ctx;

                ctx.restore();
                ctx.font = `${(height / 5).toFixed(2)}px`;
                ctx.fillStyle = '#000';
                ctx.textBaseline = 'middle';

                const text = `${Math.round(progresso)}%`;
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }
    };

    const data = {
        datasets: [{
            data: [progresso, 100 - progresso],
            backgroundColor: [corAtendidos, corNaoAtendidos],
            hoverBackgroundColor: [corAtendidos, corNaoAtendidos]
        }]
    };

    let graficoDonut = new Chart(ctx, { type: 'doughnut', data, options });

    const updateTextoPorcentagem = () => {
        const textElement = document.getElementById('porcentagemTexto');
        if (!textElement) return;

        const porcentagem = Math.round(progresso);
        textElement.innerText = `${porcentagem}%`;
        if (porcentagem >= 9.9) {
            textElement.style.transform = 'translate(-200%, -40%) scale(1.3)';
        }
    };

    const animacaoProgresso = () => {
        if (progresso >= progressoFinal) {
            graficoDonut.data.datasets[0].data = [atendidas, total - atendidas];
            graficoDonut.update();
            return;
        }

        progresso += increment;
        graficoDonut.data.datasets[0].data = [progresso, 100 - progresso];
        graficoDonut.update();
        updateTextoPorcentagem();
        setTimeout(animacaoProgresso, 10);
    };

    animacaoProgresso();
}
