pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t registry:5000/cookingmatch:latest .'
	sh 'docker push registry:5000/cookingmatch:latest'
      }
    }
    stage('Stage') {
      steps {
        input 'Do you want to stage this? (Click "Proceed" to continue)'
	sh 'docker network inspect -f "{{range .Containers}}{{println .Name}}{{end}}" cooking_cooking|xargs -r docker rm -fv'
        sh 'docker-compose up --detach && sleep 100'
	sh 'docker run --network cooking_cooking -d -p 3000:3000 registry:5000/cookingmatch:latest'
      }
    }
  }
}
