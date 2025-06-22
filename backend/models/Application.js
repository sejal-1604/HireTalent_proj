const mongoose = require('mongoose');
 
const applicationSchema = new mongoose.Schema({
  // References
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Candidate information
  candidateInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    }
  },
  
  // Resume and documents
  resume: {
    filename: String,
    originalName: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    fileSize: Number,
    mimeType: String
  },
  
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  
  portfolio: {
    url: String,
    description: String
  },
  
  // Application status tracking
  status: {
    type: String,
    enum: ['new', 'reviewing', 'shortlisted', 'interviewing', 'interviewed', 'offer', 'hired', 'rejected', 'withdrawn'],
    default: 'new'
  },
  
  // Interview information
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  }],
  
  // Notes and feedback
  recruiterNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Rating and evaluation
  rating: {
    overall: {
      type: Number,
      min: 1,
      max: 5
    },
    technical: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    cultural: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Application source
  source: {
    type: String,
    enum: ['direct', 'linkedin', 'referral', 'job-board', 'company-website'],
    default: 'direct'
  },
  
  // Timeline tracking
  statusHistory: [{
    status: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    reason: String
  }]
}, {
  timestamps: true
});
 
// Compound index to prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
applicationSchema.index({ status: 1, createdAt: -1 });
 
module.exports = mongoose.model('Application', applicationSchema);