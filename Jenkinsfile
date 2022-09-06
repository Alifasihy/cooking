pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t registry:5000/cookingMatch:latest .'
	sh 'docker push registry:5000/cookingMatch:latest'
      }
    }
    stage('Stage') {
      steps {
        input 'Do you want to stage this? (Click "Proceed" to continue)'
	sh 'docker network inspect -f "{{range .Containers}}{{println .Name}}{{end}}" cookingmatch_master_default|xargs -r docker rm -fv'
	// sh 'docker network create pickup-microservice' 
        sh 'docker-compose up --detach && sleep 100'
	sh 'docker run --network pickupmicroservice_master_default -d -p 3000:3000 registry:5000/cookingMatch:latest'
      }
    }
  }
}
