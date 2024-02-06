using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SimpleBookAPI.Controllers;
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

    [HttpGet("GetClients/{id}")]
    public async Task<ActionResult<List<ClientDto>>> GetClients(int id)
    {
      var clients = await _clientRepository.GetClientsByUserId(id);
      var clientsDto = _mapper.Map<List<ClientDto>>(clients);

      return clientsDto;
    }
  }

}

