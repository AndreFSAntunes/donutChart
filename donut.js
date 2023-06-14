window.onload = function () {
    graficoDonut(11);
};

function graficoDonut(porcentagem) {
    const canvas = document.getElementById('progress-chart');
    const ctx = canvas.getContext('2d');

    const startPercentage = 0;
    const endPercentage = porcentagem;
    const animationDuration = 1000;
    const frameDuration = 16; // 60 frames per second

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Progress', 'Remaining'],
            datasets: [{
                data: [startPercentage, 100 - startPercentage],
                backgroundColor: ['#36A2EB', '#EAEAEA'],
                borderWidth: 0
            }]
        },
        options: {
            cutoutPercentage: 80,
            responsive: true
        }
    });

    function animateDonut(timestamp) {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const currentPercentage = startPercentage + progress * (endPercentage - startPercentage);

        chart.data.datasets[0].data = [currentPercentage, 100 - currentPercentage];
        chart.update();

        if (elapsedTime < animationDuration) {
            requestAnimationFrame(animateDonut);
        }
    }

    let startTime = null;

    function startAnimation() {
        if (!startTime) {
            startTime = performance.now();
            requestAnimationFrame(animateDonut);
        }
    }

    startAnimation();
}
