pragma solidity ^0.8.19;

// Interfaces for Uniswap and other DeFi platforms (for example, Sushiswap) are needed. Below is the Uniswap example.
interface IUniswapV2Router {
    function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts);
    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut,address[] calldata path,address to,uint deadline) external payable returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) external payable returns (uint[] memory amounts);
}

interface ISushiSwapRouter {
    function swapExactETHForTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) external payable returns (uint[] memory amounts);
    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);
    function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}
interface IWETH9 {
    function deposit() external payable;
    function withdraw(uint256 wad) external;
    function approve(address guy, uint256 wad) external returns (bool);
    function transfer(address dst, uint256 wad) external returns (bool);
    function transferFrom(address src, address dst, uint256 wad) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address src) external view returns (uint256);
    function allowance(address src, address guy) external view returns (uint256);

    event Approval(address indexed src, address indexed guy, uint256 wad);
    event Transfer(address indexed src, address indexed dst, uint256 wad);
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MEVArb {
  address constant weth_address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  address constant uniswap_router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address constant sushiswap_router = 0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F;

  address private owner;
  IUniswapV2Router private uniswap;
  ISushiSwapRouter private sushiswap;
  
  IWETH9 WETH = IWETH9(weth_address);
  IERC20 USDT = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
  IERC20 USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
  IERC20 LINK = IERC20(0x514910771AF9Ca656af840dff83E8264EcF986CA);
  IERC20 CRV = IERC20(0xD533a949740bb3306d119CC777fa900bA034cd52);

  constructor() {
    owner = msg.sender;
    uniswap = IUniswapV2Router(uniswap_router);
    sushiswap = ISushiSwapRouter(sushiswap_router);
  }

  function testCall(address tokenIn, address tokenOut, uint amountIn) external view returns (uint[] memory amounts) {
    address[] memory path = new address[](2);
    path[0] = tokenIn;
    path[1] = tokenOut;

    amounts = uniswap.getAmountsOut(amountIn, path);
    return amounts;
  }

  // function showBalance() external views

  function testCallv0() external view returns (uint[] memory amounts) {
    uint256 amountIn = 1 * 10 ** 8;
    address[] memory path = new address[](2);
    path[0] = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    path[1] = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    amounts = uniswap.getAmountsOut(amountIn, path);
    return amounts;
  }

  function deposit(uint _amount) external payable {
    
  }

  function executeArbitrage(uint amountIn) external {
      
  }

  function arbitrage(address _address, uint _amountIn) external {
      
  }


}
