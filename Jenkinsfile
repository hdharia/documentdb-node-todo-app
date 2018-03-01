#!groovy​

node('master') {
   
   withCredentials([azureServicePrincipal('mag-svp')]) {
    sh 'az cloud set --name AzureUSGovernment'   
    sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
    }

    stage('Checkout & Build'){

        checkout scm
    }
   
   stage('development deploy')
   {
       input 'Do you approve dev deployment?'
       echo "Gained Approval for Test Deploy"
       azureWebAppPublish appName: 'asp-tech-summit-webapp', azureCredentialsId: 'mag-svp', filePath: '**/*', publishType: 'file', resourceGroup: 'asp-tech-summit-hd', slotName: 'dev', sourceDirectory: '.', targetDirectory: '.'
       sleep 30
       def devhostname = sh(script: 'az webapp deployment slot list -n hd-todo-webapp -g hd-todo-webapp --query [].defaultHostName | grep dev | cut -d \"\\"\" -f 2', returnStdout: true)
       echo "Go to https://${devhostname} to verify deployment"
   }
   
   stage('production deploy')
   {
       input 'Do you approve production deployment?'
       echo "Gained Approval for production Deploy"
       sh 'az webapp deployment slot swap -g asp-tech-summit-hd -n asp-tech-summit-webapp -s dev --target-slot production'
       sleep 30
       def hostname = sh(script: 'az webapp deployment slot list -n asp-tech-summit-webapp -g asp-tech-summit-hd --query [].defaultHostName | cut -d \"\\"\" -f 2', returnStdout: true)
       echo "Go to https://${hostname} to verify deployment"
       
   }
   
    sh 'az logout'
}