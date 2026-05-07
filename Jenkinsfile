pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Завантаження вихідного коду з GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Встановлення залежностей проєкту...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
                echo 'Залежності встановлено успішно'
            }
        }

        stage('Test') {
            steps {
                echo 'Запуск автоматизованих тестів...'
                sh 'npm test'
                echo 'Всі тести пройшли успішно'
            }
        }

        stage('Deliver') {
            steps {
                echo 'Доставка проєкту у папку cargo...'
                sh '''
                    mkdir -p $HOME/cargo/localservice
                    rsync -av --exclude='.git' --exclude='node_modules' --exclude='coverage' . $HOME/cargo/localservice/
                    echo "Проєкт доставлено у: $HOME/cargo/localservice"
                    ls -la $HOME/cargo/localservice
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline виконано успішно! Проєкт зібрано, протестовано та доставлено.'
        }
        failure {
            echo 'Pipeline завершився з помилкою. Перевірте логи вище.'
        }
    }
}
