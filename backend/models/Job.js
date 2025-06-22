const mongoose = require('mongoose');
 
const jobSchema = new mongoose.Schema({
  // Basic job information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  
  // Job details from JobGenerator component
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    default: 'full-time'
  },
  location: {
    type: String,
    trim: true
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  
  // Salary information
  salary: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  
  // Requirements and skills
  requirements: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  experience: {
    min: {
      type: Number,
      min: 0,
      default: 0
    },
    max: {
      type: Number,
      min: 0
    }
  },
  
  // Job metadata
  keywords: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  
  // Job status and visibility
  status: {
    type: String,
    enum: ['draft', 'published', 'paused', 'closed', 'archived'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Application settings
  applicationDeadline: {
    type: Date
  },
  maxApplications: {
    type: Number,
    min: 1
  },
  
  // Creator information
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  
  // Social sharing
  shareUrls: {
    linkedin: String,
    twitter: String,
    facebook: String
  }
}, {
  timestamps: true
});
 
// Index for search functionality
jobSchema.index({ title: 'text', description: 'text', keywords: 'text' });
jobSchema.index({ createdBy: 1, status: 1 });
jobSchema.index({ status: 1, isActive: 1 });
 
module.exports = mongoose.model('Job', jobSchema);