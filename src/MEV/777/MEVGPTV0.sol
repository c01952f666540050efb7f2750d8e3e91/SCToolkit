pragma solidity ^0.8.19;

// Interfaces for Uniswap and other DeFi platforms (for example, Sushiswap) are needed. Below is the Uniswap example.
interface IUniswapV2Router {
  function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);
  function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MEVArbitrage {
  address private owner;
  IUniswapV2Router public uniswap;
  IUniswapV2Router public sushiswap; 

    constructor(address _uniswap, address _sushiswap) {
        owner = msg.sender;
        uniswap = IUniswapV2Router(_uniswap);
        sushiswap = IUniswapV2Router(_sushiswap);
    }

    function deposit(uint _amount) public {
    
}

    function executeArbitrage(uint amountIn) external {
        
    }

    function arbitrage(address tokenIn, address tokenOut, uint amountIn) external {
        
        
    }
}
