<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs">
    <img src="./group-image/website-logo.png" alt="Logo" height="80">
  </a>

  <h3 align="center">PantryPal</h3>

  <p align="center">
    CS732/SE750 Project Implementation 
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#recipe-generation-demo">Recipe Generation Demo</a></li>
        <li><a href="#design">Design</a>
        <ul>
          <li><a href="#uiux-user-flow-diagram">UI/UX User Flow Diagram</a></li>
          <li><a href="#aws-arcitecture">AWS Arcitecture</a></li>
        </ul>
        </li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
     <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li>
          <a href="#installation">Installation</a>
          <ul>
            <li><a href="#nodejs">Node.js</a></li>
            <li><a href="#aws-cli">AWS CLI</a></li>
            <li><a href="#terraform">Terraform</a></li>
          </ul>
          <li><a href="#setup">Setup</a></li>
          <ul>
            <li><a href="#frontend-initialization">Frontend Initialization</a></li>
            <li><a href="#backend-initialization">Backend Initialization</a></li>
            <li><a href="#terraform-initialization">Terraform Initialization</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="#project-structure">Project Structure</a>
      <ul>
        <li><a href="#frontend-structure">Frontend Structure</a></li>
        <li><a href="#backend-structure">Backend Structure</a></li>
        <li><a href="#e2e-testing-structure">E2E Testing Structure</a></li>
        <li><a href="#infrastructure-structure">Infrastructure Structure</a></li>
      </ul>
    </li>
    <li><a href="#pages-overview">Pages Overview</a></li>
</details>

## Contributors
- Alex Kim
- Joao Madelino
- Kyla Lee
- Jacky Zhou
- Justin Conn

## About The Project
<div align="center">
<img src="./group-image/landing-page.png" alt="Landing Page" width="800" />
</div>

PantryPal is a user-friendly recipe generation web application powered by OpenAI. It creates personalised recipes based on your ingredients, weather conditions, cooking time, and more.

### Key Features

* <b>Personalized Recipes:</b> Utilizes OpenAI to generate recipes tailored to your preferences and available ingredients.
* <b>User Sessions:</b> Implemented user sessions for easy access to favorite recipes and viewing recently generated recipes, saving user preferences and enabling a seamless experience.
* <b>Flexible Options:</b> Initially presents three recipes, with the option to generate more if desired.
* <b>User-Friendly Interface:</b> Select ingredients from a list or search for specific ones. Common items are available as buttons for convenience.
* <b>Customizable Recipe Search:</b> Filter recipes by cooking time, serving size, and dietary restrictions like gluten-free or vegan.
* <b>Detailed Recipe Information:</b> Each recipe includes step-by-step instructions, nutritional info, cooking times, serving sizes, and an image of the final dish.
* <b>Save Favorite Recipes:</b> Bookmark favorite recipes for easy access later.
* <b>Weather-Based Recipe Recommendations:</b> Input your location, and PantryPal suggests recipes based on the weather, offering warm meals for cold days and refreshing dishes for hot weather.
* <b>Viewing History:</b> Easily access previously viewed recipes for quick reference.

### Recipe Generation Demo

<div align="center">
    <img src="./group-image/demo-preview1.gif" alt="Recipe Generation Gif" width="800">
</div>

When a user inputs their preferences, the information is sent to OpenAI through the backend. OpenAI then generates three unique recipes based on the selected ingredients and filters. Additionally, we've integrated a donut chart to visually represent estimated nutrition values. This feature allows users to choose recipes based on these values without needing to navigate to the recipe details page.

### Design

Our team delved into UI/UX and system design to improve our prototype for further learning.

#### UI/UX User Flow Diagram
<div align="center">
    <img src="./group-image/userflow.png" alt="Recipe Generation Gif" width="800">
</div>

Before starting development, we crafted user flow diagrams, wireframes, and low-fidelity prototypes using sketches and Canva. Throughout development, we utilized Figma to refine designs and assist developers with frontend implementation.

* [Canva Design](https://www.canva.com/design/DAGBPHaPbxk/yaaQCsAD0hCP899BANdNkg/edit)
* [Figma Design](https://www.figma.com/file/oOBCIo1tFyJsMhxZdRrRKs/PantryPal?type=design&node-id=0%3A1&mode=design&t=QKXuv5n798gV7Sea-1)

#### AWS Architecture 
<div align="center">
    <img src="./group-image/aws-diagram1.png" alt="Recipe Generation Gif" width="800">
</div>

To deploy our web app, we utilized various AWS services for our MERN stack. Static files are hosted on an S3 Bucket, served via CloudFront, and connected to a DNS name through Route 53. Our backend is deployed on an EC2 instance with an application load balancer, enabling communication between frontend and backend. To enable HTTPS connections required by CloudFront, we attached a TLS/SSL certificate via ACM.

### Built With

* <a href="https://react.dev/" ><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white"/></a>
* <a href="https://aws.amazon.com/free/?gclid=Cj0KCQjwlN6wBhCcARIsAKZvD5jwIgWrykDmG7eeAuycctzjjgnZaLAsRfAjl58i1fZFUzBmAZ14aicaAgj7EALw_wcB&trk=f181118c-0869-454a-84d2-63d0cf7146e3&sc_channel=ps&ef_id=Cj0KCQjwlN6wBhCcARIsAKZvD5jwIgWrykDmG7eeAuycctzjjgnZaLAsRfAjl58i1fZFUzBmAZ14aicaAgj7EALw_wcB:G:s&s_kwcid=AL!4422!3!638125895456!e!!g!!aws!19068271377!141241695742&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all" ><img src="https://img.shields.io/badge/AWS%20CLI-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/></a>
* <a href="https://www.terraform.io/" ><img src="https://img.shields.io/badge/Terraform-844FBA?style=for-the-badge&logo=terraform&logoColor=white"/></a>
* <a href="https://ui.shadcn.com/" ><img src="https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/></a>
* <a href="https://tailwindui.com/" ><img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/></a>
* <a href="https://expressjs.com/" ><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"/></a>
* <a href="https://www.typescriptlang.org/" ><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/></a>
* <a href="https://www.mongodb.com/" ><img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/></a>
* <a href="https://nodejs.org/en" ><img src="https://img.shields.io/badge/nodedotjs-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white"/></a>
* <a href="https://www.npmjs.com/" ><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/></a>
* <a href="https://www.cypress.io/" ><img src="https://img.shields.io/badge/cypress-69D3A7?style=for-the-badge&logo=cypress&logoColor=white"/></a>
* <a href="https://jestjs.io/" ><img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/></a>
* <a href="https://www.figma.com/" ><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/></a>
* <a href="https://www.canva.com/" ><img src="https://img.shields.io/badge/canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white"/></a>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

<table>
    <tr>
        <th>Prerequisite</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Text Editor or IDE</td>
        <td>Choose a text editor or integrated development environment (IDE) for editing files. <a href="https://code.visualstudio.com/">Visual Studio Code</a> is recommended, but you can also use <a href="https://atom.io/">Atom</a>, <a href="https://www.jetbrains.com/idea/?var=1">Intellij</a>, or <a href="https://www.sublimetext.com/">Sublime Text</a>.</td>
    </tr>
    <tr>
        <td>Extensions</td>
        <td>If using Visual Studio Code, consider installing <a href="https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform">HashiCorp Terraform</a> and <a href="https://marketplace.visualstudio.com/items?itemName=hashicorp.hcl">HashiCorp HCL</a> to enhance your development experience.</td>
    </tr>
    <tr>
        <td>Path Configuration</td>
        <td>Make sure you have access to add the directory containing the Terraform binary to your system's PATH environment variable on your computer.</td>
    </tr>
    <tr>
        <td>AWS Cloud Provider Credentials</td>
        <td>Ensure you've set up the required AWS credentials or authentication mechanisms.</td>
    </tr>
    <tr>
        <td>npm/Node.js</td>
        <td>Install <a href="https://www.npmjs.com/">npm</a> and <a href="https://nodejs.org/en">Node.js</a> on your system for managing dependencies and running JavaScript-based tools.</td>
    </tr>
</table>

### Installation

**Note:** The instructions provided here are from the official website's installation guide. You can find additional options on the website.</br>
* <a href="https://nodejs.org/en/download">Node.js</a>
* <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">AWS CLI</a>
* <a href="https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli">Terraform</a>

#### Node.js

<details>
  <summary>Prebuild Installer</summary>
  <ol>
    <li>Access prebuild installer here: <a href="https://nodejs.org/en/download">Node.js</a></li>
    <li>Choose Node.js verison from step 1: <pre><code>v20.13.0 (LTS)</code></pre></li>
    <li>Choose OS from step 2, e.g: <pre><code>Windows</code></pre></li>
    <li>Choose architectures from step 2, e.g: <pre><code>x64</code></pre></li>
  </ol>
</details>

#### AWS CLI

<details>
  <summary>Windows</summary>
  <ol>
    <li>Download and run the AWS CLI MSI installer for Windows (64-bit): <a href="https://awscli.amazonaws.com/AWSCLIV2.msi">https://awscli.amazonaws.com/AWSCLIV2.msi</a>
    </br><b>Alternatively</b>, you can run the msiexec command to run the MSI installer:
      <pre><code>msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi</code></pre>
    </li>
    <li>To confirm the installation, open the Start menu, search for cmd to open a command prompt window, and at the command prompt use the aws --version command:
      <pre><code>aws --version</code></pre>
    </li>
  </ol>
</details>

<details>
  <summary>MacOS</summary>
  <ol>
    <li>In your browser, download the macOS <code>pkg</code> file: <a href="https://awscli.amazonaws.com/AWSCLIV2.pkg">https://awscli.amazonaws.com/AWSCLIV2.pkg</a></li>
    <li>Run your downloaded file and follow the on-screen instructions. You can choose to install the AWS CLI in the following ways:
      <ul>
        <li><strong>For all users on the computer (requires sudo)</strong>
          <ul>
            <li>You can install to any folder, or choose the recommended default folder of <code>/usr/local/aws-cli</code>.</li>
            <li>The installer automatically creates a symlink at <code>/usr/local/bin/aws</code> that links to the main program in the installation folder you chose.</li>
          </ul>
        </li>
        <li><strong>For only the current user (doesn't require sudo)</strong>
          <ul>
            <li>You can install to any folder to which you have write permission.</li>
            <li>Due to standard user permissions, after the installer finishes, you must manually create a symlink file in your <code>$PATH</code> that points to the <code>aws</code> and <code>aws_completer</code> programs by using the following commands at the command prompt. If your <code>$PATH</code> includes a folder you can write to, you can run the following command without <code>sudo</code> if you specify that folder as the target's path. If you don't have a writable folder in your <code>$PATH</code>, you must use <code>sudo</code> in the commands to get permissions to write to the specified target folder. The default location for a symlink is <code>/usr/local/bin/</code>.
              <pre><code>sudo ln -s /folder/installed/aws-cli/aws /usr/local/bin/aws
sudo ln -s /folder/installed/aws-cli/aws_completer /usr/local/bin/aws_completer</code></pre>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>To verify that the shell can find and run the <code>aws</code> command in your <code>$PATH</code>, use the following commands.
      <pre><code>which aws
aws --version</code></pre>
    </li>
  </ol>
</details>

#### Terraform

<details>
  <summary>Pre-compiled binary</summary>
  <ol>
    <li>To install Terraform, find the <a href="https://developer.hashicorp.com/terraform/install">appropriate package</a> for your system and download it as a zip archive.</li>
    <li>After downloading Terraform, unzip the package. Terraform runs as a single binary named <code>terraform</code>. Any other files in the package can be safely removed and Terraform will still function.</li>
    <li>Finally, make sure that the <code>terraform</code> binary is available on your <code>$PATH</code>. This process will differ depending on your operating system.
      <details>
        <summary>Windows</summary>
        <ol>
          <li>Add the folder location to your <code>$PATH</code> variable, e.g., <code>Control Panel</code> &rarr; <code>System</code> &rarr; <code>System settings</code> &rarr; <code>Environment Variables</code>.</li>
          <li>In System Variables, select <code>Path</code>, click <code>Edit</code>, click <code>New</code>, enter the location of the Terraform .exe, e.g., <code>C:\Apps\Terraform</code>, then click <code>OK</code>.</li>
        </ol>
      </details>
      <details>
        <summary>macOS</summary>
        <ol>
          <li>Print a colon-separated list of locations in your <code>$PATH</code>.
            <pre><code>echo $PATH</code></pre>
          </li>
          <li>Move the Terraform binary to one of the listed locations. This command assumes that the binary is currently in your downloads folder and that your <code>$PATH</code> includes <code>/usr/local/bin</code>, but you can customize it if your locations are different.
            <pre><code>mv ~/Downloads/terraform /usr/local/bin/</code></pre>
          </li>
        </ol>
      </details>
    </li>
    <li>To verify that the shell can find and run the <code>terraform</code> command in your <code>$PATH</code>, use the following command.
      <pre><code>terraform -help</code></pre>
    </li>
  </ol>
</details>

<details>
  <summary>Homebrew on macOS</summary>
  <ol>
    <li>Install Homebrew from <a href="https://brew.sh/">https://brew.sh/</a>
    <li>Now, install Terraform using command line.
    <pre><code>brew install terraform</code></pre>
    </li>
  </ol>
</details>

<details>
  <summary>Choclatey on Windows</summary>
  <ol>
    <li>Install Chocolatey from <a href="https://chocolatey.org/install">https://chocolatey.org/install</a>
    <li>Now, install Terraform using command line.
    <pre><code>choco install terraform</code></pre></li>
  </ol>
</details>

### Setup

Clone the repo
```sh
git clone https://github.com/jgconn/cs732-se750-group-project.git
```

#### Frontend Initialization

```sh
cd ./frontend
npm install // install frontend dependencies
npm run dev // start nodejs server
```

#### Backend Initialization

```sh
cd ./backend
npm install // install backend dependencies
npm start // start nodejs server
```

#### Terraform Initialization

**Note:** These steps occur after cloning the repo.

**Note**: In `./modules/ec2/init.sh` You need to input your GitHub Secret Key.

1. Move to `infrastructure` directory in repo
```sh
cd .\project-group-apricot-aardvarks\infrastructure\
```
2. Run `aws configure` in command line
```sh
AWS Access Key ID: MYACCESSKEY
AWS Secret Access Key: MYSECRETKEY
Default region name [us-west-2]: us-east-1
Default output format [None]: json
```
<a name="step4"></a>

3. Create a <a href="#tfvars">terraform.tfvars</a> file and input variables
```hcl
region               = "us-east-1"
bucket_name          = "uoa-project.com"
website_suffix       = "index.html"
route_53_domain_name = "uoa-project.com"
route_53_zone_id     = "ZONE_ID"
vpc_name             = "uoa-project"
availability_zone1   = "us-east-1a"
availability_zone2   = "us-east-1b"
security_group_name  = "uoa-project-sg"
instance_name        = "uoa-project"
instance_type        = "t2.micro"
ami                  = "AMI_ID"
alb_name             = "test-alb123"
instance_port        = 3001
```
4. Initiate terraform directory
```sh
terraform init
```
5. Execute terraform script
```sh
terraform apply
```
6. Move to `frontend` directory in repo
```
cd .\project-group-apricot-aardvarks\frontend\   
```
7. Go into `frontend` directory and edit .env file from `http://localhost:3001/api` to `https://uoa-project.com/api`
```
VITE_API_BASE_URL=https://uoa-project.com/api
```
8. Run `npm run build` in `frontend` directory
```
npm run build
```
9. Run `s3 sync` (`BUCKET_NAME` from <a href="#step4">step4</a>)
```sh
aws s3 sync dist/ s3://uoa-project.com
```
10. Paste `VITE_API_BASE_URL` into browser
```
https://uoa-project.com/api
```
11. To remove all AWS resources, move to `infrastructure` directory
```
cd .\project-group-apricot-aardvarks\infrastructure\
```
12. Remove all AWS resources created with terraform
```sh
terraform destroy
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

Text here for structure overview

### Frontend Structure

**Note:** The `.env` file should not be publicly accessible and should be included in your `.gitignore`.

<table>
    <tr>
        <th>File</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><a href="./frontend/cypress/">cypress</a></td>
        <td>contains end-to-end (E2E) test files and related resources, serving as a dedicated directory for organizing and executing end-to-end tests within a project.</td>
    </tr>
    <tr>
        <td><a href="./frontend/dist/">dist</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/src/assets/">assets</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/src/components/">components</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/src/hooks/">hooks</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/src/lib/">lib</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/src/types/">types</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/src/views/">views</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
</table>

Below is the template Frontend directory:

```
frontend/
│
├── cypress/
│   └── ...
│
├── dist/
│   └── ...
│
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── ...
│   │   └── images/
│   │       └── ...
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── box.tsx
│   │   │   ├── button.tsx
│   │   │   └── ...
│   │   ├── AddIngredient.tsx
│   │   ├── CustomRouter.tsx
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useGets.ts
│   │   └── ...
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── types/
│   │   ├── constraints.ts
│   │   ├── enums.ts
│   │   └── ...
│   │
│   └── views/
│   |   ├── FavouritesPage.tsx
│   |   ├── HistoryPage.tsx
│   |   └── ...
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .env
├── .index.html
├── package-lock.json
└── ...
```

### Backend Structure

<table>
    <tr>
        <th>File</th>
        <th>Description</th>
    </tr>
  <tr>
        <td><a href="./backend/src/controllers/">controllers</a></td>
        <td>Contaims files that specify logic for handling incoming requests to backend endpoints and managing corresponding response.</td>
    </tr>
    <tr>
        <td><a href="./backend/src/models/">models</a></td>
        <td>Contains the schemas for MongoDB collections. Each model defines the structure of a document within a collection.</td>
    </tr>
    <tr>
        <td><a href="./backend/src/routes/">routes</a></td>
        <td>Defines the routes of the application. Each route specifies an endpoint URL and associates it with a specific controller function that should handle requests made to that endpoint.</td>
    </tr>
    <tr>
        <td><a href="./backend/src/services/">services</a></td>
        <td>Contains functions for interacting with OpenAI apis.</td>
    </tr>
    <tr>
        <td><a href="./backend/test/">test</a></td>
        <td>Contains integration test scripts for testing backend endpoints using Jest.</td>
    </tr>
</table>

Below is the template Backend directory:

**Note:** The `.env` file should not be publicly accessible and should be included in your `.gitignore`.

```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── favouritesController.js
│   │   ├── historyController.js
│   │   └── ...
│   │
│   ├── models/
│   │   ├── ingredientSchema.js
│   │   ├── recipeSchema.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── favourites.js
│   │   ├── history.js
│   │   └── ...
│   │
│   └── services/
│       └── openaiServices.js
│
├── app.js
├── test/
│   └── UserController.test.js
│
├── .babelrc
├── .env
├── package-lock.json
└── package.json
```

### E2E Testing Structure 

<table>
    <tr>
        <th>File</th>
        <th>Description</th>
    </tr>
  <tr>
        <td><a href="./frontend/cypress/e2e/">e2e</a></td>
        <td>contains end-to-end (E2E) test files and related resources, serving as a dedicated directory for organizing and executing end-to-end tests within a project.</td>
    </tr>
    <tr>
        <td><a href="./frontend/cypress/fixtures/">fixtures</a></td>
        <td>Stores static files containing test data used within Cypress tests, facilitating data management and reusability across test cases.</td>
    </tr>
    <tr>
        <td><a href="./frontend/cypress/support/">support</a></td>
        <td>serves as a central repository for custom commands, fixtures, plugins, and utility functions, enhancing organization and extensibility within your Cypress test suite.</td>
    </tr>
</table>

Below is the template Cypress directory:

```
frontend/
│
└── cypress/
    ├── e2e/
    │   ├── searchIngredients.cy.ts
    │   ├── validateNavBar.cy.ts
    │   └── ...
    │
    ├── fixtures/
    │   └── example.json
    │
    └── support/
        ├── commands.ts
        └── e2e.ts
```

### Infrastructure Structure

<a name="tfvars"></a>

**Note:** The `terraform.tfvars` file should not be publicly accessible and should be included in your `.gitignore`.

<table>
    <tr>
        <th>File</th>
        <th>Description</th>
    </tr>
  <tr>
        <td><a href="./infrastructure/provider.tf">provider.tf</a></td>
        <td>Defines the configuration for your Terraform provider(s), specifying the cloud or infrastructure platform to be used.</td>
    </tr>
    <tr>
        <td><a href="./infrastructure/main.tf">main.tf</a></td>
        <td>Contains the main configuration for your infrastructure resources.</td>
    </tr>
    <tr>
        <td><a href="./infrastructure/outputs.tf">outputs.tf</a></td>
        <td>Contains variable declarations. Variables are used to parameterize your Terraform configurations, allowing you to customize settings without modifying the main configuration.</td>
    </tr>
    <tr>
        <td><a href="./infrastructure/variables.tf">variables.tf</a></td>
        <td>Contains output declarations. Outputs are used to expose values from your infrastructure after it's been created.</td>
    </tr>
    <tr>
        <td><a href="https://registry.terraform.io/providers/terraform-redhat/rhcs/latest/docs/guides/terraform-vars">terraform.tfvars</a></td>
        <td>Defines values for input variables. This interacts with your variables.tf file.</td>
    </tr>
    <tr>
        <td><a href="./infrastructure/modules">modules</a></td>
        <td>Modules are a way to organize, reuse, and encapsulate Terraform configurations. They allow you to create reusable units of infrastructure.</td>
    </tr>
</table>

Below is the template Terraform directory:

```
infrastructure/
│
├── modules/
│   ├── module1/
│   │   ├── main.tf
│   │   ├── outputs.tf
│   │   └── variables.tf
│   │
│   ├── module2/
│   │   ├── main.tf
│   │   ├── outputs.tf
│   │   └── variables.tf
│   │
│   └── ...
│
├── main.tf
├── outputs.tf
├── provider.tf
├── variables.tf
└── terraform.tfvars
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Pages Overview
An overview of the pages that a user can visit while using PantryPal.

### Landing Page
In the landing page, we introduce users to our app, showing the pal who will be helping us with the recipe generation.  We show the simple steps that the user needs to follow to be able to create a nice meal with the ingredients that they have available. It is very straight forward, with the only interactable element being in the middle of the page. 

### Navigation Bar
In every page, including the landing page, there will be a nav bar showing all the pages that the user can access. These pages are the home page(landing page), recipe generation page (ingredients page), favourites page and history page. There is also the option for the user to login to the website.

### Login Page
Users only need to input their usernames, with minimum character length being 8 characters. After the login, the login button now shows their username and they will have their own user session. 

### Ingredients Page 
This page is where users choose what ingredients they have and apply any filters to generate the ideal recipe for them. This page includes, ingredients selection, a search to add ingredients, a location search to access their local weather, and filters to further match the users time constraints and dietary requirements. We have a wide selection of pre chosen ingredients for users which are basic assumed ingredients. Users will be able to search for more ingredients as well for ingredients that are not on the premade list. The filters provide users with the choice of different maximum cooking times, serving size and dietary restrictions to further match their needs. Finally, they can submit their suggestions and then wait for the recipes to generate. 

### Results Page
For the results page, we chose to display three recipes and allow for extra recipes to be generated if the user wishes to. Each recipe will be displayed and the user will be able to click any of them. We provide sufficient information to the user to help them make their choice such as nutrition information summary, an image, a recipe summary, estimated cooking and preparation time and dietary limitations available. 

### Recipe Details Page
For the recipe details, we show the full information including the cooking steps, ingredient measurements, and more specific nutritional values. Users from here can start preparing the ingredients and then start cooking. If they enjoy the recipe, then they can favourite it using the heart button. 
