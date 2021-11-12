## Setting up Jfrogcli in CI process:
We can use existing GitHub action from Jfrog to install Jfrogcli in the CI process.
as part of using the jfrogcli action we need to provide the JF_ARTIFACTORY secret. 
Follow the below steps to create the JF_ARTIFACTORY secret and save as part GitHub secrets.
  1.	Make sure JFrog CLI version 1.29.0 or above is installed on your local machine by running jfrog -v.
  2.	Configure the details of the Artifactory server by running jfrog c add.
  3.	Export the details of the Artifactory server you configured, using the server ID you chose. Do this by running jfrog c export <SERVER ID>.
  4.	Copy the generated token to the clipboard and save it as a secret on GitHub.
  
  ![image](https://user-images.githubusercontent.com/31221465/140869714-d93af146-943a-4be4-88b3-b936ed8accda.png)

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

  ![image](https://user-images.githubusercontent.com/31221465/140873709-2e3b69a6-be71-4e92-b8d6-b4100b61c388.png)
