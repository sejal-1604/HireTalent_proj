const mongoose = require('mongoose');
 
const messageSchema = new mongoose.Schema({
  // Conversation participants
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['recruiter', 'candidate']
    }
  }],
  
  // Message content
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  
  // Message metadata
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Message type
  type: {
    type: String,
    enum: ['text', 'file', 'system', 'offer-letter', 'rejection'],
    default: 'text'
  },
  
  // Related entities
  relatedJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  relatedApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },
  relatedInterview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  },
  
  // File attachments
  attachments: [{
    filename: String,
    originalName: String,
    url: String,
    fileSize: Number,
    mimeType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Message status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  
  // Read receipts
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Message threading
  threadId: {
    type: String,
    required: true
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  
  // System message data
  systemData: {
    action: String,
    data: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});
 
// Indexes for efficient querying
messageSchema.index({ threadId: 1, createdAt: -1 });
messageSchema.index({ 'participants.user': 1, createdAt: -1 });
messageSchema.index({ sender: 1, createdAt: -1 });
 
module.exports = mongoose.model('Message', messageSchema);