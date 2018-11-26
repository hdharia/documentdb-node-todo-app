#!groovy​

node('master') {
   
   withCredentials([azureServicePrincipal('mag-svp')]) {
        sh 'az cloud set --name AzureUSGovernment'   
        sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
    }

    stage('Checkout & Build'){

        checkout scm
    }
   
   stage('Dev/Test deploy')
   {
       input 'Do you approve Dev/Test deployment?'
       echo "Gained Approval for Dev/Test Deploy"
       azureWebAppPublish appName: 'asp-tech-summit-webapp', azureCredentialsId: 'mag-svp', filePath: '**/*', publishType: 'file', resourceGroup: 'asp-tech-summit-hd', slotName: 'dev', sourceDirectory: '.', targetDirectory: '.'
       sleep 30
       //def devhostname = sh(script: 'az webapp deployment slot list -n hd-todo-webapp -g hd-todo-webapp --query [].defaultHostName | grep dev | cut -d \"\\"\" -f 2', returnStdout: true)
       echo "Go to https://asp-tech-summit-webapp-dev.azurewebsites.us to verify deployment"
   }
   
   stage('production deploy')
   {
       input 'Do you approve production deployment?'
       echo "Gained Approval for production Deploy"
       azureWebAppPublish appName: 'asp-tech-summit-webapp', azureCredentialsId: 'mag-svp', filePath: '**/*', publishType: 'file', resourceGroup: 'asp-tech-summit-hd', sourceDirectory: '.', targetDirectory: '.'
       //def hostname = sh(script: 'az webapp deployment slot list -n asp-tech-summit-webapp -g asp-tech-summit-hd --query [].defaultHostName | cut -d \"\\"\" -f 2', returnStdout: true)
       echo "Go to https://asp-tech-summit-webapp.azurewebsites.us to verify deployment"
   }
   
    sh 'az logout'
}