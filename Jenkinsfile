pipeline {
    agent any

    environment {
        HARBOR        = 'harbor.hadiubaidillah.com/wilayah'
        DEPLOY_DIR    = '/opt/home/wilayah/source/wilayah'
        HOME          = '/var/lib/jenkins'
        DOCKER_CONFIG = '/var/lib/jenkins/.docker'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/hadiubaidillah/wilayah'
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD 2>/dev/null || echo "ALL"',
                        returnStdout: true
                    ).trim()

                    echo "Changed files:\n${changedFiles}"

                    // Mapping: path prefix -> service name
                    def pathMap = [
                        'backend/spring-boot/' : 'spring-boot',
                        'backend/golang/'      : 'golang',
                        'backend/rust/'        : 'rust',
                        'frontend/react/'      : 'react',
                        'frontend/angular/'    : 'angular',
                        'frontend/vue/'        : 'vue',
                    ]

                    def toBuild = [] as Set

                    if (changedFiles == 'ALL') {
                        // First commit or fallback — build semua
                        toBuild = pathMap.values() as Set
                    } else {
                        changedFiles.split('\n').each { file ->
                            // apps.config.production.json → semua frontend
                            if (file == 'frontend/apps.config.production.json') {
                                toBuild += ['react', 'angular', 'vue']
                                return
                            }
                            // docker-compose.yml → semua service
                            if (file == 'docker-compose.yml') {
                                toBuild = pathMap.values() as Set
                                return
                            }
                            // Match prefix
                            pathMap.each { prefix, svc ->
                                if (file.startsWith(prefix)) toBuild << svc
                            }
                        }
                    }

                    env.SERVICES = toBuild.join(' ')
                    echo "Services to build: ${env.SERVICES ?: '(none)'}"
                }
            }
        }

        stage('Build') {
            when { expression { env.SERVICES?.trim() } }
            steps {
                sh '''
                    cp $DEPLOY_DIR/.env .
                    for svc in $SERVICES; do
                        echo ">>> Building $svc"
                        docker compose build $svc
                    done
                '''
            }
        }

        stage('Push to Harbor') {
            when { expression { env.SERVICES?.trim() } }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'harbor-credentials',
                    usernameVariable: 'HARBOR_USER',
                    passwordVariable: 'HARBOR_PASS'
                )]) {
                    sh '''
                        echo $HARBOR_PASS | docker login harbor.hadiubaidillah.com -u $HARBOR_USER --password-stdin
                        for svc in $SERVICES; do
                            echo ">>> Pushing $svc"
                            docker compose push $svc
                        done
                    '''
                }
            }
        }

        stage('Deploy') {
            when { expression { env.SERVICES?.trim() } }
            steps {
                sh '''
                    cd $DEPLOY_DIR
                    for svc in $SERVICES; do
                        echo ">>> Deploying $svc"
                        docker compose pull $svc
                        docker compose up -d $svc
                    done
                '''
            }
        }

    }

    post {
        always {
            sh 'docker logout harbor.hadiubaidillah.com || true'
        }
        success {
            echo "Deploy berhasil: https://wilayah.hadiubaidillah.com"
        }
        failure {
            echo 'Pipeline gagal — cek log di atas'
        }
    }
}
