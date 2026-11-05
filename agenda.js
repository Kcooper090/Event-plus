document.addEventListener('DOMContentLoaded', () => {

    const linksAdicionar = document.querySelectorAll('.btn-adicionar-agenda');

    linksAdicionar.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

    
            const card = link.closest('.card');
            
            if (card) {
       
                const titulo = card.getAttribute('data-title') || card.querySelector('.card__content h3, .card__content p:first-child')?.innerText || 'Sem título';
                const descricao = card.getAttribute('data-desc') || card.querySelector('.card__content p:last-child')?.innerText || 'Sem descrição';
                const dataVisualizacao = new Date().toLocaleDateString('pt-BR');

                const novoEvento = {
                    id: Date.now(),
                    titulo: titulo,
                    descricao: descricao,
                    dataAcesso: dataVisualizacao
                };

   
                let historico = JSON.parse(localStorage.getItem('historicoAgenda')) || [];


                historico.unshift(novoEvento);

                localStorage.setItem('historicoAgenda', JSON.stringify(historico));

              
                const textoOriginal = link.innerText;
                link.innerText = 'Salvo com sucesso!';
                link.style.pointerEvents = 'none'; 
                link.style.color = '#28a745'; 

                
                setTimeout(() => {
                    link.innerText = textoOriginal;
                    link.style.pointerEvents = 'auto';
                    link.style.color = '';
                }, 2000);
            }
        });
    });


    const containerHistorico = document.getElementById('historico-container');
    const btnLimpar = document.getElementById('btn-limpar-historico');

    if (containerHistorico) {
        function carregarHistorico() {
            const historico = JSON.parse(localStorage.getItem('historicoAgenda')) || [];

            if (historico.length === 0) {
                containerHistorico.innerHTML = '<p style="text-align: center; color: #666;">Nenhum evento adicionado ao histórico ainda.</p>';
                return;
            }

            containerHistorico.innerHTML = historico.map(evento => `
                <div class="card" style="width: 100%; margin-bottom: 15px;">
                    <div class="card__content">
                        <h3>${evento.titulo}</h3>
                        <p>${evento.descricao}</p>
                        <small style="color: #888;">Adicionado em: ${evento.dataAcesso}</small>
                    </div>
                </div>
            `).join('');
        }

        carregarHistorico();

        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => {
                localStorage.removeItem('historicoAgenda');
                carregarHistorico();
            });
        }
    }
});