import axios from 'axios';
import { ApiResponse, OpenAIResponse, PinataResponse } from '@/types';

// API client configuration
const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * OpenAI API integration for generating scripts and summary cards
 */
export class OpenAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate bilingual scripts for user interactions
   */
  async generateScript(
    scenario: string,
    state: string,
    language: 'english' | 'spanish' | 'both'
  ): Promise<string> {
    try {
      const prompt = this.buildScriptPrompt(scenario, state, language);
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a legal rights expert who creates clear, actionable scripts for police encounters. Focus on constitutional rights and de-escalation.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1000,
          temperature: 0.3,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI script generation error:', error);
      throw new Error('Failed to generate script');
    }
  }

  /**
   * Generate shareable summary card from interaction data
   */
  async generateSummaryCard(
    interactionData: {
      timestamp: Date;
      location: string;
      duration: number;
      notes: string;
      scenario: string;
    }
  ): Promise<string> {
    try {
      const prompt = this.buildSummaryPrompt(interactionData);
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a legal documentation assistant. Create concise, professional summaries of police encounters for legal reference.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.2,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI summary generation error:', error);
      throw new Error('Failed to generate summary card');
    }
  }

  private buildScriptPrompt(scenario: string, state: string, language: string): string {
    const basePrompt = `Create a clear, actionable script for a ${scenario} in ${state}. Include:
    1. What to say to remain calm and respectful
    2. Key constitutional rights to remember
    3. What NOT to say or do
    4. De-escalation phrases
    
    Keep it concise and practical for high-stress situations.`;

    if (language === 'both') {
      return `${basePrompt}\n\nProvide the script in both English and Spanish, clearly labeled.`;
    } else if (language === 'spanish') {
      return `${basePrompt}\n\nProvide the script in Spanish only.`;
    }
    
    return basePrompt;
  }

  private buildSummaryPrompt(data: any): string {
    return `Create a professional summary card for this police encounter:
    
    Date/Time: ${data.timestamp.toISOString()}
    Location: ${data.location}
    Duration: ${Math.floor(data.duration / 60)} minutes
    Scenario: ${data.scenario}
    Notes: ${data.notes}
    
    Format as a concise summary with:
    - Key details
    - Timeline
    - Important observations
    - Recommended next steps
    
    Keep it factual and professional for potential legal use.`;
  }
}

/**
 * Pinata IPFS service for storing evidence and summary cards
 */
export class PinataService {
  private apiKey: string;
  private secretKey: string;

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  /**
   * Upload file to IPFS via Pinata
   */
  async uploadFile(file: File | Blob, metadata?: any): Promise<PinataResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (metadata) {
        formData.append('pinataMetadata', JSON.stringify(metadata));
      }

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'pinata_api_key': this.apiKey,
            'pinata_secret_api_key': this.secretKey,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Pinata upload error:', error);
      throw new Error('Failed to upload to IPFS');
    }
  }

  /**
   * Upload JSON data to IPFS
   */
  async uploadJSON(data: any, metadata?: any): Promise<PinataResponse> {
    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          pinataContent: data,
          pinataMetadata: metadata,
        },
        {
          headers: {
            'pinata_api_key': this.apiKey,
            'pinata_secret_api_key': this.secretKey,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Pinata JSON upload error:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  /**
   * Get IPFS gateway URL for a hash
   */
  getGatewayUrl(ipfsHash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }
}

/**
 * Airstack service for location-based legal information
 */
export class AirstackService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get location-specific legal information
   */
  async getLocationLegalInfo(state: string): Promise<any> {
    try {
      const query = `
        query GetLocationInfo($state: String!) {
          # This would be customized based on Airstack's actual schema
          # for legal/location data if available
        }
      `;

      const response = await axios.post(
        'https://api.airstack.xyz/gql',
        {
          query,
          variables: { state },
        },
        {
          headers: {
            'Authorization': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Airstack API error:', error);
      throw new Error('Failed to fetch location legal info');
    }
  }
}

/**
 * Stripe service for payment processing
 */
export class StripeService {
  private publishableKey: string;

  constructor(publishableKey: string) {
    this.publishableKey = publishableKey;
  }

  /**
   * Create payment intent for micro-transactions
   */
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<any> {
    try {
      const response = await apiClient.post('/api/payments/create-intent', {
        amount,
        currency,
      });

      return response.data;
    } catch (error) {
      console.error('Stripe payment intent error:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  /**
   * Process micro-transaction
   */
  async processMicroTransaction(
    paymentMethodId: string,
    amount: number,
    description: string
  ): Promise<any> {
    try {
      const response = await apiClient.post('/api/payments/process', {
        paymentMethodId,
        amount,
        description,
      });

      return response.data;
    } catch (error) {
      console.error('Stripe micro-transaction error:', error);
      throw new Error('Failed to process payment');
    }
  }
}

/**
 * Generic API error handler
 */
export const handleApiError = (error: any): ApiResponse<null> => {
  console.error('API Error:', error);
  
  if (error.response) {
    return {
      success: false,
      error: error.response.data?.message || 'Server error',
      message: `HTTP ${error.response.status}`,
    };
  } else if (error.request) {
    return {
      success: false,
      error: 'Network error',
      message: 'Unable to connect to server',
    };
  } else {
    return {
      success: false,
      error: error.message || 'Unknown error',
      message: 'Request failed',
    };
  }
};

/**
 * API service factory
 */
export const createApiServices = () => {
  const openaiKey = process.env.OPENAI_API_KEY;
  const pinataKey = process.env.PINATA_API_KEY;
  const pinataSecret = process.env.PINATA_SECRET_API_KEY;
  const airstackKey = process.env.AIRSTACK_API_KEY;
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return {
    openai: openaiKey ? new OpenAIService(openaiKey) : null,
    pinata: pinataKey && pinataSecret ? new PinataService(pinataKey, pinataSecret) : null,
    airstack: airstackKey ? new AirstackService(airstackKey) : null,
    stripe: stripeKey ? new StripeService(stripeKey) : null,
  };
};
