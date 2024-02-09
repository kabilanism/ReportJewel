using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SimpleBookAPI.Data.DTOs;
using SimpleBookAPI.Data.Repositories.Interfaces;

namespace SimpleBookAPI.Controllers
{
  public class ClientController : BaseApiController
  {
    private readonly IClientRepository _clientRepository;
    private readonly IMapper _mapper;

    public ClientController(IClientRepository clientRepository, IMapper mapper)
    {
      _clientRepository = clientRepository;
      _mapper = mapper;
    }

    [HttpGet("list")]
    public async Task<ActionResult<List<ClientDto>>> GetClients([FromQuery] int userId)
    {
      var clients = await _clientRepository.GetClientsByUserId(userId);
      var clientsDto = _mapper.Map<List<ClientDto>>(clients);

      return clientsDto;
    }
  }
}

