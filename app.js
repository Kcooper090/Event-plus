

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');

    const validationRules = {
        nome: {
            validate: (value) => value.trim().length >= 3,
            message: 'Digite seu nome (mínimo 3 caracteres).'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
            message: 'Insira um e-mail válido (ex: nome@dominio.com).'
        },
        senha: {
            validate: (value) => value.trim().length >= 8,
            message: 'A senha deve ter no mínimo 8 caracteres.'
        }
    };

    function toggleError(input, errorMessage) {
        
        const container = input.closest('.form-group') || input.parentElement;
        const errorElement = container.querySelector('.error-msg');

        if (errorMessage) {
            input.classList.add('invalid');
            if (errorElement) errorElement.textContent = errorMessage;
        } else {
            input.classList.remove('invalid');
            if (errorElement) errorElement.textContent = '';
        }
    }

    function validateInput(input) {
        const rule = validationRules[input.name];
        if (!rule) return true;

        const isValid = rule.validate(input.value);
        
        if (!isValid) {
            toggleError(input, rule.message);
            return false;
        } else {
            toggleError(input, null);
            return true;
        }
    }


    Object.keys(validationRules).forEach((fieldName) => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (!input) return;

    
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });

    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        let isFormValid = true;

      
        Object.keys(validationRules).forEach((fieldName) => {
            const input = form.querySelector(`[name="${fieldName}"]`);
            if (input) {
                const isValid = validateInput(input);
                if (!isValid) isFormValid = false;
            }
        });

       
        if (isFormValid) {
            const formData = {
                nome: form.nome.value.trim(),
                email: form.email.value.trim(),
                senha: form.senha.value.trim()
            };

            console.log('Dados do formulário válidos:', formData);
            alert('Cadastro realizado com sucesso!');
            
           
        }
    });
});


   