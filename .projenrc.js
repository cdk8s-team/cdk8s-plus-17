const path = require('path');
const { JsiiProject } = require('projen');

const SPEC_VERSION = '17';
const K8S_VERSION = '1.17.0';

const project = new JsiiProject({
  name: `cdk8s-plus-${SPEC_VERSION}`,
  description: 'High level abstractions on top of cdk8s',

  repositoryUrl: 'https://github.com/cdk8s-team/cdk8s-plus-17.git',
  authorName: 'Amazon Web Services',
  authorUrl: 'https://aws.amazon.com',

  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  prerelease: 'beta',

  // without this, the version of 'constructs' would need to be controlled
  // from this file, since otherwise it would create a 0.0.0 dev dependency.
  peerDependencyOptions: {
    pinnedDevDependency: false,
  },

  peerDeps: [
    'cdk8s',
    'constructs',
  ],
  deps: [
    'minimatch',
  ],
  bundledDeps: [
    'minimatch',
  ],
  devDeps: [
    'constructs',
    '@types/minimatch',
    'cdk8s',
    'cdk8s-cli',
    'constructs',
  ],

  defaultReleaseBranch: 'main',
  minNodeVersion: '10.17.0',

  // jsii configuration
  publishToMaven: {
    javaPackage: `org.cdk8s.plus${SPEC_VERSION}`,
    mavenGroupId: 'org.cdk8s',
    mavenArtifactId: `cdk8s-plus-${SPEC_VERSION}`,
  },
  publishToPypi: {
    distName: `cdk8s-plus-${SPEC_VERSION}`,
    module: `cdk8s_plus_${SPEC_VERSION}`,
  },
  publishToNuget: {
    dotNetNamespace: `Org.Cdk8s.Plus${SPEC_VERSION}`,
    packageId: `Org.Cdk8s.Plus${SPEC_VERSION}`,
  },
  publishToGo: {
    gitUserName: 'cdk8s-automation',
    gitUserEmail: 'cdk8s-team@amazon.com',
    moduleName: 'github.com/cdk8s-team/cdk8s-plus-17-go',
  },
  autoApproveOptions: {
    allowedUsernames: ['cdk8s-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
});

const importdir = path.join('src', 'imports');

project.setScript('import', `cdk8s -l typescript -o ${importdir} import k8s@${K8S_VERSION}`);
project.synth();
