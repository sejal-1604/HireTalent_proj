const mongoose = require('mongoose');
 
const interviewSchema = new mongoose.Schema({
  // References
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
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
  
  // Interview details
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['phone-screening', 'video-call', 'in-person', 'technical', 'behavioral', 'final-round', 'panel'],
    required: true
  },
  
  // Scheduling information
  scheduledDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 60
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  
  // Meeting details
  meetingLink: {
    type: String,
    trim: true
  },
  meetingId: {
    type: String,
    trim: true
  },
  meetingPassword: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  
  // Participants
  interviewer: {
    primary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    additional: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  
  // Interview status
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'],
    default: 'scheduled'
  },
  
  // Feedback and evaluation
  feedback: {
    technical: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      notes: String
    },
    communication: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      notes: String
    },
    cultural: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      notes: String
    },
    overall: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      notes: String,
      recommendation: {
        type: String,
        enum: ['strong-hire', 'hire', 'no-hire', 'strong-no-hire']
      }
    }
  },
  
  // Interview preparation
  agenda: [{
    item: String,
    duration: Number // in minutes
  }],
  questions: [{
    question: String,
    category: String,
    answer: String,
    score: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  
  // Rescheduling history
  rescheduleHistory: [{
    previousDate: Date,
    newDate: Date,
    reason: String,
    rescheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rescheduledAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Notifications
  remindersSent: [{
    type: {
      type: String,
      enum: ['24h', '2h', '30min']
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});
 
// Indexes for efficient querying
interviewSchema.index({ candidateId: 1, scheduledDate: 1 });
interviewSchema.index({ 'interviewer.primary': 1, scheduledDate: 1 });
interviewSchema.index({ status: 1, scheduledDate: 1 });
 
module.exports = mongoose.model('Interview', interviewSchema);