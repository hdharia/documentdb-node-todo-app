#!groovy​

node {
   echo 'Hello World'
   
   withCredentials([azureServicePrincipal('mag-svp')]) {
    sh 'az cloud set --name AzureUSGovernment'   
    sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
    }

    stage('Checkout'){

        checkout scm
    }
   
   stage('development deploy')
   {
       input 'Do you approve dev deployment?'
       echo "Gained Approval for Test Deploy"
       azureWebAppPublish appName: 'hd-todo-webapp', azureCredentialsId: 'mag-svp', filePath: '**/*', publishType: 'file', resourceGroup: 'hd-todo-webapp', slotName: 'dev', sourceDirectory: '.', targetDirectory: '.'
       sh 'echo \'Go to $(az webapp deployment slot list -n hd-todo-webapp -g hd-todo-webapp --query [].defaultHostName | grep dev | cut -d \"\\"\" -f 2) to verify deployment\''
       sleep 30
       echo 'Go to https://$devhostname to verify deployment'
   }
   
   stage('test deploy')
   {
       input 'Do you approve test deployment?'

       echo "Gained Approval for Test Deploy"
       sh 'az webapp deployment slot swap -g hd-todo-webapp -n hd-todo-webapp -s dev --target-slot test'
       sh 'testhostname=$(az webapp deployment slot list -n hd-todo-webapp -g hd-todo-webapp --query [].defaultHostName | grep test | cut -d \"\\"\" -f 2)'
       sleep 30
       echo 'Go to https://$testhostname to verify deployment'
       
   }
   
   stage('production deploy')
   {
       input 'Do you approve production deployment?'
       echo "Gained Approval for Production Deploy"
       sh 'az webapp deployment slot swap -g hd-todo-webapp -n hd-todo-webapp -s test --target-slot production'

       sh 'prodhostname=$(az webapp show -n hd-todo-webapp -g hd-todo-webapp --query defaultHostName | cut -d \"\\"\" -f 2)'
       sleep 30
       echo 'Go to https://$prodhostname to verify deployment'
       
   }
   
    sh 'az logout'

}