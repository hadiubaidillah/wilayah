pipeline {
    agent any

    environment {
        HARBOR    = 'harbor.hadiubaidillah.com/wilayah'
        DEPLOY_DIR = '/opt/home/wilayah/source/wilayah'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/hadiubaidillah/wilayah'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Push to Harbor') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'harbor-credentials',
                    usernameVariable: 'HARBOR_USER',
                    passwordVariable: 'HARBOR_PASS'
                )]) {
                    sh '''
                        echo $HARBOR_PASS | docker login harbor.hadiubaidillah.com -u $HARBOR_USER --password-stdin
                        docker compose push
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd $DEPLOY_DIR
                    docker compose pull
                    docker compose up -d
                '''
            }
        }

    }

    post {
        always {
            sh 'docker logout harbor.hadiubaidillah.com || true'
        }
        success {
            echo 'Deploy berhasil: https://wilayah.hadiubaidillah.com'
        }
        failure {
            echo 'Pipeline gagal — cek log di atas'
        }
    }
}
