const Stats = require('../models/Stats');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get all stats
// @route   GET /api/stats
// @access  Public
exports.getStats = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get visible stats
// @route   GET /api/stats/visible
// @access  Public
exports.getVisibleStats = asyncHandler(async (req, res, next) => {
  const stats = await Stats.find({ isVisible: true }).sort('order');

  res.status(200).json({
    success: true,
    count: stats.length,
    data: stats
  });
});

// @desc    Get single stat
// @route   GET /api/stats/:id
// @access  Public
exports.getStat = asyncHandler(async (req, res, next) => {
  const stat = await Stats.findById(req.params.id);

  if (!stat) {
    return next(
      new ErrorResponse(`Stat not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: stat
  });
});

// @desc    Create new stat
// @route   POST /api/stats
// @access  Private/Admin
exports.createStat = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const stat = await Stats.create(req.body);

  res.status(201).json({
    success: true,
    data: stat
  });
});

// @desc    Update stat
// @route   PUT /api/stats/:id
// @access  Private/Admin
exports.updateStat = asyncHandler(async (req, res, next) => {
  let stat = await Stats.findById(req.params.id);

  if (!stat) {
    return next(
      new ErrorResponse(`Stat not found with id of ${req.params.id}`, 404)
    );
  }

  stat = await Stats.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: stat
  });
});

// @desc    Delete stat
// @route   DELETE /api/stats/:id
// @access  Private/Admin
exports.deleteStat = asyncHandler(async (req, res, next) => {
  const stat = await Stats.findById(req.params.id);

  if (!stat) {
    return next(
      new ErrorResponse(`Stat not found with id of ${req.params.id}`, 404)
    );
  }

  await stat.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 