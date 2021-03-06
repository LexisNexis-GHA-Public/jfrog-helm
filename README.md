## Setting up Jfrogcli in CI process:
We can use existing GitHub action from Jfrog to install Jfrogcli in the CI process.
as part of using the jfrogcli action we need to provide the JF_ARTIFACTORY secret. 
Follow the below steps to create the JF_ARTIFACTORY secret and save as part GitHub secrets.
  1.	Make sure JFrog CLI version 1.29.0 or above is installed on your local machine by running jfrog -v.
  2.	Configure the details of the Artifactory server by running jfrog c add.
  3.	Export the details of the Artifactory server you configured, using the server ID you chose. Do this by running jfrog c export <SERVER ID>.
  4.	Copy the generated token to the clipboard and save it as a secret on GitHub.

  example: https://github.com/marketplace/actions/setup-jfrog-cli

Once the secret is saved, we can use the jfrogcli action as below.
  
  ![image](https://user-images.githubusercontent.com/31221465/140869758-5c21b69b-0ed9-4cfd-8979-1254c503604f.png)


## Jfrog push action Usage:
Action supports following 
# Action Input:
|name|description|
|--------|----------|
|version|Version of Jfrogcli|
|build-name|name of the build|
|build-number|build number|
|build-type|build type of the build|
|helm-repo|Jfrog helm repository|
|promote-to-repo|promote image to repository|
|promote-source-repo|promote image from repository|
|promote-build-number|jfrog build number to promote|
|promote-build-name|jfrog build name to promote|
|build-fail-onscan|if true job is failed if the xray scan has vulnerabilities|


1.	helm-build
with input build-type as helm-build, action collects environment variables for the build, publishes helm package along with build info along with Jfrog xray scan is triggered.

Usage

  <img width="836" alt="Screen Shot 2021-12-01 at 8 39 54 AM" src="https://user-images.githubusercontent.com/31221465/144165089-59206f43-fd3a-425b-95b8-aa7604604dd0.png">
  
2.	promote-build
with input build-type as promote-build, action promotes the build from one lifecycle repository to another life cycle repository.
  
Usage:
  
  <img width="590" alt="Screen Shot 2021-12-01 at 9 08 23 AM" src="https://user-images.githubusercontent.com/31221465/144167910-335e4da0-775d-41bf-8866-775200a1cd72.png">

