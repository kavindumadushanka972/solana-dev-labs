use anchor_lang::prelude::*;

declare_id!("itT96nghevMZsVzn9UFbnzCA8o17n2paYU6JCPCkvJd");

#[program]
pub mod temp_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
