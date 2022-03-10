import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddWalletDto } from 'src/controllers/wallets/dto/addWallet.dto';
import { DeleteWalletDto } from 'src/controllers/wallets/dto/deleteWallet.dto';
import { GetWalletDto } from 'src/controllers/wallets/dto/getWallet.dto';
import { UpdateWalletDto } from 'src/controllers/wallets/dto/updateWallet.dto';
import { WalletsService } from './services/wallet.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  addWallet(@Body() addWalletDto: AddWalletDto) {
    return this.walletsService.create({
      id: -1,
      address: addWalletDto.address,
      balance: -1,
      isOld: false,
    });
  }

  @Get(':id')
  getWallets(@Param() params: GetWalletDto) {
    return this.walletsService.find(
      params.id.split(',').map((id) => parseInt(id)),
    );
  }

  @Get()
  getAllWallets() {
    return this.walletsService.findAll();
  }

  @Put()
  updateWallet(@Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(
      updateWalletDto.id,
      updateWalletDto.address,
    );
  }

  @Delete()
  deleteWallet(@Body() deleteWalletDto: DeleteWalletDto) {
    return this.walletsService.delete(deleteWalletDto.id);
  }
}
