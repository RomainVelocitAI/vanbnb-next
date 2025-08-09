#!/usr/bin/env node

/**
 * Script de vérification de sécurité pour VanBNB
 * Vérifie les headers, CSP, et configurations de sécurité
 */

const https = require('https');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const PROD_URL = process.env.VERCEL_URL || 'https://vanbnb.vercel.app';

// Couleurs pour le terminal
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Tests de sécurité
const securityTests = {
  // Headers de sécurité requis
  requiredHeaders: [
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
    'x-xss-protection',
    'referrer-policy',
    'content-security-policy'
  ],

  // Valeurs attendues pour les headers
  expectedValues: {
    'strict-transport-security': /max-age=\d+/,
    'x-content-type-options': /nosniff/,
    'x-frame-options': /(DENY|SAMEORIGIN)/,
    'x-xss-protection': /1;\s*mode=block/,
    'referrer-policy': /strict-origin/,
    'content-security-policy': /default-src/
  },

  // Packages npm à vérifier pour les vulnérabilités
  npmAudit: async () => {
    try {
      const { stdout } = await exec('npm audit --json');
      const audit = JSON.parse(stdout);
      return {
        vulnerabilities: audit.metadata.vulnerabilities,
        total: audit.metadata.totalDependencies
      };
    } catch (error) {
      // npm audit retourne un code d'erreur si des vulnérabilités sont trouvées
      const audit = JSON.parse(error.stdout);
      return {
        vulnerabilities: audit.metadata.vulnerabilities,
        total: audit.metadata.totalDependencies
      };
    }
  },

  // Vérification des variables d'environnement
  checkEnvVars: () => {
    const required = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const missing = required.filter(key => !process.env[key]);
    return { required, missing };
  },

  // Test des headers HTTP
  testHeaders: (url) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const headers = res.headers;
        const results = {};

        securityTests.requiredHeaders.forEach(header => {
          const value = headers[header];
          const expected = securityTests.expectedValues[header];
          
          if (!value) {
            results[header] = { status: 'missing', value: null };
          } else if (expected && !expected.test(value)) {
            results[header] = { status: 'invalid', value };
          } else {
            results[header] = { status: 'valid', value };
          }
        });

        resolve(results);
      }).on('error', reject);
    });
  },

  // Vérification SSL/TLS
  checkSSL: (url) => {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      https.get({
        hostname: urlObj.hostname,
        port: 443,
        path: '/',
        method: 'GET'
      }, (res) => {
        const cert = res.socket.getPeerCertificate();
        const now = new Date();
        const expiry = new Date(cert.valid_to);
        const daysLeft = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));
        
        resolve({
          valid: cert.valid_from <= now && now <= cert.valid_to,
          issuer: cert.issuer.O,
          daysLeft,
          expiryDate: cert.valid_to
        });
      }).on('error', reject);
    });
  }
};

// Fonction principale
async function runSecurityCheck() {
  console.log(`${colors.blue}🔒 VanBNB Security Check${colors.reset}\n`);
  console.log(`Testing: ${PROD_URL}\n`);

  let totalScore = 0;
  let maxScore = 0;

  // 1. Test des headers de sécurité
  console.log(`${colors.yellow}📋 Testing Security Headers...${colors.reset}`);
  try {
    const headers = await securityTests.testHeaders(PROD_URL);
    Object.entries(headers).forEach(([header, result]) => {
      maxScore++;
      if (result.status === 'valid') {
        console.log(`  ${colors.green}✓${colors.reset} ${header}: ${result.value?.substring(0, 50)}...`);
        totalScore++;
      } else if (result.status === 'missing') {
        console.log(`  ${colors.red}✗${colors.reset} ${header}: MISSING`);
      } else {
        console.log(`  ${colors.yellow}⚠${colors.reset} ${header}: ${result.value}`);
        totalScore += 0.5;
      }
    });
  } catch (error) {
    console.log(`  ${colors.red}✗${colors.reset} Could not test headers: ${error.message}`);
  }

  // 2. Test SSL/TLS
  console.log(`\n${colors.yellow}🔐 Testing SSL/TLS...${colors.reset}`);
  try {
    const ssl = await securityTests.checkSSL(PROD_URL);
    maxScore++;
    if (ssl.valid && ssl.daysLeft > 30) {
      console.log(`  ${colors.green}✓${colors.reset} SSL Certificate valid (${ssl.daysLeft} days remaining)`);
      console.log(`    Issuer: ${ssl.issuer}`);
      totalScore++;
    } else if (ssl.valid && ssl.daysLeft <= 30) {
      console.log(`  ${colors.yellow}⚠${colors.reset} SSL Certificate expiring soon (${ssl.daysLeft} days)`);
      totalScore += 0.5;
    } else {
      console.log(`  ${colors.red}✗${colors.reset} SSL Certificate invalid`);
    }
  } catch (error) {
    console.log(`  ${colors.red}✗${colors.reset} Could not verify SSL: ${error.message}`);
  }

  // 3. Test npm audit
  console.log(`\n${colors.yellow}📦 Testing NPM Dependencies...${colors.reset}`);
  try {
    const audit = await securityTests.npmAudit();
    maxScore++;
    const total = Object.values(audit.vulnerabilities).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
      console.log(`  ${colors.green}✓${colors.reset} No vulnerabilities found`);
      totalScore++;
    } else {
      console.log(`  ${colors.red}✗${colors.reset} Found ${total} vulnerabilities:`);
      Object.entries(audit.vulnerabilities).forEach(([level, count]) => {
        if (count > 0) {
          const color = level === 'critical' || level === 'high' ? colors.red : colors.yellow;
          console.log(`    ${color}${count} ${level}${colors.reset}`);
        }
      });
      if (audit.vulnerabilities.critical === 0 && audit.vulnerabilities.high === 0) {
        totalScore += 0.5;
      }
    }
    console.log(`  Total dependencies: ${audit.total}`);
  } catch (error) {
    console.log(`  ${colors.yellow}⚠${colors.reset} Could not run npm audit`);
  }

  // 4. Variables d'environnement
  console.log(`\n${colors.yellow}🔑 Testing Environment Variables...${colors.reset}`);
  const envCheck = securityTests.checkEnvVars();
  maxScore++;
  if (envCheck.missing.length === 0) {
    console.log(`  ${colors.green}✓${colors.reset} All required variables present`);
    totalScore++;
  } else {
    console.log(`  ${colors.red}✗${colors.reset} Missing variables:`);
    envCheck.missing.forEach(v => console.log(`    - ${v}`));
  }

  // Score final
  const percentage = Math.round((totalScore / maxScore) * 100);
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}Security Score: ${percentage}%${colors.reset}`);
  
  if (percentage >= 90) {
    console.log(`${colors.green}✓ Excellent security posture!${colors.reset}`);
  } else if (percentage >= 70) {
    console.log(`${colors.yellow}⚠ Good security, but improvements needed${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Critical security issues found${colors.reset}`);
    process.exit(1);
  }
}

// Exécution
if (require.main === module) {
  runSecurityCheck().catch(console.error);
}

module.exports = { securityTests };