const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const router = express.Router();
 
// @route   POST /api/auth/register
// @desc    Register new user (matches Register.tsx)
// @access  Public
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { name, email, password, role = 'recruiter' } = req.body;
 
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
 
    // Create new user
    const user = new User({
      displayName: name,
      email: email.toLowerCase(),
      password,
      role,
      isEmailVerified: false
    });
 
    await user.save();
 
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
 
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});
 
// @route   POST /api/auth/login
// @desc    Login user (matches Login.tsx)
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
 
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
 
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
 
    // Update last login
    user.lastLogin = new Date();
    await user.save();
 
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
 
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});
 
// @route   POST /api/auth/forgot-password
// @desc    Send password reset email (matches AuthContext.tsx)
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
 
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address'
      });
    }
 
    // Generate reset token (implement email sending logic)
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
 
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
 
    // TODO: Send email with reset link
    // await sendPasswordResetEmail(user.email, resetToken);
 
    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send password reset email',
      error: error.message
    });
  }
});
 
// @route   GET /api/auth/me
// @desc    Get current user (matches AuthContext.tsx)
// @access  Private
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
 
    res.json({
      success: true,
      data: { user: user.toJSON() }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data',
      error: error.message
    });
  }
});
 
module.exports = router;